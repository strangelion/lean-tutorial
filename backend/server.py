"""
Lean 4 tutorial backend — WebSocket server that receives Lean code from the
browser, runs it in a sandboxed Lean 4 process, and streams back results.
"""

import asyncio
import json
import subprocess
import tempfile
from pathlib import Path

import fastapi
import uvicorn
from fastapi import WebSocket, WebSocketDisconnect

app = fastapi.FastAPI(title="Lean Tutorial Backend")

# Path to the Lean executable (set via env var for Docker / local overrides)
LEAN_BIN = Path(__file__).parent / "game_levels"


def wrap_code_with_exercise(code: str, exercise_file: str | None) -> str:
    """If an exercise template file exists, prepend it; otherwise run code as-is."""
    if exercise_file:
        template_path = LEAN_BIN / exercise_file
        if template_path.exists():
            preamble = template_path.read_text(encoding="utf-8")
            return preamble + "\n" + code
    return code


def run_lean_code(code: str) -> dict:
    """Run Lean 4 code in a temp directory and parse the output."""
    with tempfile.TemporaryDirectory() as tmpdir:
        filepath = Path(tmpdir) / "Main.lean"
        filepath.write_text(code, encoding="utf-8")

        try:
            result = subprocess.run(
                ["lean", str(filepath)],
                capture_output=True,
                text=True,
                timeout=30,
            )
            stdout = result.stdout
            stderr = result.stderr
        except FileNotFoundError:
            return {
                "type": "error",
                "message": "Lean 4 not found. Install via https://lean-lang.org/.",
            }
        except subprocess.TimeoutExpired:
            return {"type": "error", "message": "Execution timed out (30s)."}

    if result.returncode == 0:
        return {"type": "success", "message": "Proof accepted!", "raw": stdout}
    else:
        return {"type": "error", "message": parse_lean_error(stderr or stdout)}


def parse_lean_error(output: str) -> str:
    """Extract the most relevant error lines from Lean's output."""
    lines = output.strip().split("\n")
    error_lines = [l.strip() for l in lines if "error" in l.lower()]
    if error_lines:
        return "\n".join(error_lines[-3:])
    return "\n".join(lines[-5:])


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive_text()
            try:
                msg = json.loads(data)
            except json.JSONDecodeError:
                await ws.send_json({"type": "error", "message": "Invalid JSON."})
                continue

            if msg.get("type") != "execute":
                await ws.send_json(
                    {"type": "error", "message": f"Unknown type: {msg.get('type')}"}
                )
                continue

            code = msg.get("code", "")
            if not code.strip():
                await ws.send_json({"type": "error", "message": "Empty code."})
                continue

            exercise_file = msg.get("fileId")
            full_code = wrap_code_with_exercise(code, exercise_file)
            result = run_lean_code(full_code)
            await ws.send_json(result)
    except WebSocketDisconnect:
        pass


@app.get("/health")
async def health():
    has_lean = False
    try:
        subprocess.run(["lean", "--version"], capture_output=True, timeout=5)
        has_lean = True
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass
    return {"status": "ok", "lean_installed": has_lean}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

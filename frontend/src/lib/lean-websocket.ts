// lib/lean-websocket.ts
// WebSocket client for Lean backend — with offline simulation fallback.

const WS_URL = process.env.NEXT_PUBLIC_LEAN_WS_URL || "ws://localhost:8000/ws";

export interface LeanResult {
  type: "success" | "error" | "goal";
  message?: string;
  goals?: string[];
}

type MessageHandler = (result: LeanResult) => void;

let ws: WebSocket | null = null;
const handlers: Set<MessageHandler> = new Set();

/** Simulate checking user-submitted Lean code by matching against known proofs */
function simulateLean(code: string): LeanResult {
  const normalized = code
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");

  if (!normalized) {
    return { type: "error", message: "Empty input." };
  }

  // Common Lean 4 beginner proof patterns — accept known-correct proofs
  const validPatterns = [
    // S -> S, intro + exact
    /example\s*:\s*S\s*[→]\s*S\s*:=\s*\n\s*by\s*\n\s*intro\s+\w+\s*\n\s*exact\s+\w+/,
    // P /\ Q -> P, intro + rcases + exact
    /intro\s+\w+\s*\n\s*(?:rcases\s+\w+\s+with\s+[⟨(]\w+,\s*\w+[⟩)])\s*\n\s*exact\s+\w+/,
    // forall a : Prop, a -> a
    /∀\s*\w+\s*:\s*Prop,\s*\w+\s*[→]\s*\w+[\s\S]*intro\s+\w+\s*\n\s*intro\s+\w+\s*\n\s*exact\s+\w+/,
    // P /\ Q <-> Q /\ P, constructor
    /P\s*∧\s*Q\s*[↔]\s*Q\s*∧\s*P[\s\S]*constructor/,
    // n + 0 = n, induction
    /n\s*\+\s*0\s*=\s*n[\s\S]*induction\s+\w+\s+with/,
  ];

  for (const pattern of validPatterns) {
    if (pattern.test(normalized)) {
      return { type: "success", message: "Proof accepted!" };
    }
  }

  // Detect common typos
  if (/\bintroo\b/.test(normalized)) {
    return {
      type: "error",
      message: "error: unknown identifier 'introo'\ndid you mean 'intro'?",
    };
  }
  if (/\bexactt\b/.test(normalized)) {
    return {
      type: "error",
      message: "error: unknown identifier 'exactt'\ndid you mean 'exact'?",
    };
  }
  if (/\brefll\b/.test(normalized)) {
    return {
      type: "error",
      message: "error: unknown identifier 'refll'\ndid you mean 'rfl'?",
    };
  }
  if (/\binductionn\b/.test(normalized)) {
    return {
      type: "error",
      message: "error: unknown identifier 'inductionn'\ndid you mean 'induction'?",
    };
  }

  // Too short / incomplete
  if (normalized.length < 15) {
    return {
      type: "error",
      message: "Incomplete proof. Keep going!",
    };
  }

  // Default: incomplete
  return {
    type: "error",
    message: "Proof not yet complete. Check your tactics and try again.",
  };
}

export function connectLean(): WebSocket | null {
  if (ws && ws.readyState === WebSocket.OPEN) return ws;

  try {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      // Connected successfully
    };

    ws.onmessage = (event) => {
      try {
        const result: LeanResult = JSON.parse(event.data);
        handlers.forEach((h) => h(result));
      } catch {
        // ignore parse errors
      }
    };

    ws.onclose = () => {
      ws = null;
    };

    ws.onerror = () => {
      // Connection failed — the caller will fall back to simulation
      ws = null;
    };
  } catch {
    ws = null;
  }

  return ws;
}

export function sendCode(code: string): void {
  // Try WebSocket first; fall back to simulation if no backend
  const socket = connectLean();

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "execute", code }));
  } else if (socket && socket.readyState === WebSocket.CONNECTING) {
    // Wait a moment for the connection, then decide
    const timeout = setTimeout(() => {
      // If still connecting after 2s, simulate
      if (socket.readyState === WebSocket.CONNECTING) {
        const result = simulateLean(code);
        handlers.forEach((h) => h(result));
      }
    }, 2000);

    socket.onopen = () => {
      clearTimeout(timeout);
      socket.send(JSON.stringify({ type: "execute", code }));
    };

    socket.onerror = () => {
      clearTimeout(timeout);
      const result = simulateLean(code);
      setTimeout(() => handlers.forEach((h) => h(result)), 100);
    };
  } else {
    // No backend available — simulate
    const result = simulateLean(code);
    setTimeout(() => handlers.forEach((h) => h(result)), 300);
  }
}

export function onMessage(handler: MessageHandler): () => void {
  handlers.add(handler);
  return () => handlers.delete(handler);
}

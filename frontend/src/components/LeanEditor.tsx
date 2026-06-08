"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { sendCode, onMessage, type LeanResult } from "@/lib/lean-websocket";
import { LEAN4_LANGUAGE_ID, LEAN4_MONARCH } from "@/lib/lean4-monarch";

import type { editor } from "monaco-editor";

const Editor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false },
);

interface LeanEditorProps {
  initialCode?: string;
  exerciseId?: string;
  lessonSlug?: string;
  onSuccess?: () => void;
}

// Lean 4 unicode symbols — shown as toolbar buttons above the editor.
const SYMBOL_BUTTONS = [
  { symbol: "⟨⟩", label: "⟨⟩", insert: "⟨⟩" },
  { symbol: "→", label: "→", insert: "→" },
  { symbol: "∀", label: "∀", insert: "∀" },
  { symbol: "∧", label: "∧", insert: "∧" },
  { symbol: "∨", label: "∨", insert: "∨" },
  { symbol: "↔", label: "↔", insert: "↔" },
  { symbol: "¬", label: "¬", insert: "¬" },
  { symbol: "∃", label: "∃", insert: "∃" },
  { symbol: "λ", label: "λ", insert: "λ" },
  { symbol: "⊢", label: "⊢", insert: "⊢" },
] as const;

function registerLean4Language(monaco: typeof import("monaco-editor")) {
  const existing = monaco.languages
    .getLanguages()
    .find((l) => l.id === LEAN4_LANGUAGE_ID);
  if (existing) return;

  monaco.languages.register({ id: LEAN4_LANGUAGE_ID });
  monaco.languages.setMonarchTokensProvider(LEAN4_LANGUAGE_ID, LEAN4_MONARCH);
  monaco.languages.setLanguageConfiguration(LEAN4_LANGUAGE_ID, {
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
      ["⟨", "⟩"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: "⟨", close: "⟩" },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
    ],
    comments: { lineComment: "--", blockComment: ["/-", "-/"] },
  });
}

export default function LeanEditor({
  initialCode = "",
  onSuccess,
}: LeanEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<LeanResult | null>(null);
  const [running, setRunning] = useState(false);
  const isFirstRun = useRef(true);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const unsubscribe = onMessage((result) => {
      setOutput(result);
      setRunning(false);
      if (result.type === "success" && onSuccess) {
        onSuccess();
      }
    });
    return unsubscribe;
  }, [onSuccess]);

  const handleBeforeMount = useCallback(
    (monaco: typeof import("monaco-editor")) => {
      registerLean4Language(monaco);
    },
    [],
  );

  const handleEditorMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      editorRef.current = editor;

      // Turn off confusable-unicode-highlighting warnings
      editor.updateOptions({
        unicodeHighlight: {
          nonBasicASCII: false,
          ambiguousCharacters: false,
          invisibleCharacters: false,
        },
      });
    },
    [initialCode],
  );

  const handleRun = () => {
    setRunning(true);
    setOutput(null);
    sendCode(code);
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) setCode(value);
    if (isFirstRun.current && value !== initialCode) {
      isFirstRun.current = false;
    }
  };

  const insertSymbol = (symbol: string) => {
    const ed = editorRef.current;
    if (!ed) return;
    const selection = ed.getSelection();
    if (!selection) return;
    ed.executeEdits("symbol", [
      {
        range: selection,
        text: symbol,
        forceMoveMarkers: true,
      },
    ]);
    ed.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">
          Lean 代码编辑器
        </span>
        <button
          onClick={handleRun}
          disabled={running || !code.trim()}
          className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {running ? "运行中..." : "运行 ▶"}
        </button>
      </div>

      {/* Symbol toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-100 border-b border-gray-200 overflow-x-auto">
        {SYMBOL_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            onClick={() => insertSymbol(btn.insert)}
            title={`插入 ${btn.label}`}
            className="px-2 py-0.5 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-400 transition-colors font-mono shrink-0"
          >
            {btn.symbol}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="h-72">
        <Editor
          height="100%"
          defaultLanguage={LEAN4_LANGUAGE_ID}
          value={code}
          onChange={handleChange}
          onMount={handleEditorMount}
          beforeMount={handleBeforeMount}
          theme="vs"
          options={{
            fontSize: 14,
            fontFamily:
              "'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Geist Mono', monospace",
            minimap: { enabled: false },
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
            padding: { top: 8 },
            unicodeHighlight: {
              nonBasicASCII: false,
              ambiguousCharacters: false,
              invisibleCharacters: false,
            },
          }}
          loading={
            <div className="h-full flex items-center justify-center text-sm text-gray-400">
              编辑器加载中...
            </div>
          }
        />
      </div>

      {/* Output / feedback */}
      {output && (
        <div
          className={`px-3 py-2 text-sm font-mono border-t whitespace-pre-wrap ${
            output.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : output.type === "error"
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-blue-50 text-blue-800 border-blue-200"
          }`}
        >
          {output.type === "success" && "证明通过！"}
          {output.type === "error" && (output.message || "未知错误")}
          {output.type === "goal" &&
            output.goals?.map((g, i) => <div key={i}>{g}</div>)}
        </div>
      )}
    </div>
  );
}

// lib/lean4-monarch.ts - Monarch tokenizer for Lean 4 syntax highlighting
// Runs inside the browser via Monaco's built-in tokenizer engine.

import type { languages } from "monaco-editor";

export const LEAN4_LANGUAGE_ID = "lean4";

const typeKeywords = [
  "Prop", "Type", "Sort", "Nat", "Int", "Rat", "Real", "Float",
  "String", "Char", "Bool", "List", "Array", "Option", "Except",
  "IO", "Pos", "Fin", "UInt8", "UInt16", "UInt32", "UInt64",
  "USize", "Empty", "Unit", "PUnit", "True", "False", "And", "Or",
  "Not", "Iff", "Eq", "HEq", "Exists", "Subtype", "Sigma", "PSigma",
  "Decidable", "Inhabited", "BEq", "Hashable", "ToString", "Repr",
];

const keywords = [
  "example", "theorem", "lemma", "def", "inductive", "structure", "class",
  "instance", "axiom", "opaque", "abbrev", "macro", "elab", "syntax",
  "import", "open", "export", "variable", "variables", "universe", "set_option",
  "namespace", "section", "end", "private", "protected", "noncomputable",
  "unsafe", "partial", "mutual", "where", "renaming", "hiding", "show",
  "have", "suffices", "from", "by", "let", "in", "at", "do", "if", "then",
  "else", "match", "with", "fun", "forall", "exists", "calc", "refine",
  "apply", "exact", "intro", "intros", "assumption", "rfl", "rw", "rwa",
  "simp", "simpa", "ac_rfl", "cc", "omega", "arith",
  "constructor", "cases", "rcases", "case", "induction", "injection",
  "contradiction", "exfalso", "trivial", "left", "right", "existsi",
  "use", "haveI", "specialize", "revert", "generalize", "conv",
  "unfold", "change", "native_decide", "dec_trivial",
];

const TYPE_RE = new RegExp(`\\b(${typeKeywords.join("|")})\\b`);
const KEYWORD_RE = new RegExp(`\\b(${keywords.join("|")})\\b`);

export const LEAN4_MONARCH: languages.IMonarchLanguage = {
  keywords,
  typeKeywords,

  tokenizer: {
    root: [
      [/\/-.*$/, "comment"],
      [/\/-/, "comment", "@comment"],
      [/"([^"\\]|\\.)*"/, "string"],
      [/'([^'\\]|\\.)*'/, "string"],
      [/\d+/, "number"],
      [TYPE_RE, "type"],
      [KEYWORD_RE, "keyword"],
      [/[a-z_][a-zA-Z0-9_']*/, "identifier"],
      [/[A-Z][a-zA-Z0-9_']*/, "type.identifier"],
      [/[α-ωΑ-ΩλπστφχεΔΓ]+/, "identifier"],
      [/[=!<>+\-*/%^|&:;,.@#()\[\]{}⟨⟩]/, "delimiter"],
      [/[ \t\r\n]+/, "white"],
    ],

    comment: [
      [/-*\//, "comment", "@pop"],
      [/[^-]+/, "comment"],
      [/-/, "comment"],
    ],
  },
};

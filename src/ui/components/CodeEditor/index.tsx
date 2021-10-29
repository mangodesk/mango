import Editor, { useMonaco, loader } from "@monaco-editor/react";
import { useEffect } from "react";

export default function CodeEditor() {
  loader.config({ paths: { vs: '/vs' } });

  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2018,
      lib: ["es2015", "es2016", "es2017", "es2018"],
      allowNonTsExtensions: true,
    });
  }, [monaco]);

  return (
    <Editor
      defaultLanguage="typescript"
      defaultValue="// some comment"
      theme="vs-dark"
    />
  )
}

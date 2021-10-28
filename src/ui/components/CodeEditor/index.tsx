import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function CodeEditor() {
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
      height="90vh"
      defaultLanguage="typescript"
      defaultValue="// some comment"
      theme="vs-dark"
    />
  )
}

// import { useEffect, useRef } from "react";
// import * as monaco from "monaco-editor";

// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//   target: monaco.languages.typescript.ScriptTarget.ES2018,
//   lib: ["es2015", "es2016", "es2017", "es2018"],
//   allowNonTsExtensions: true,
// });

// export default function CodeEditor() {
//   const editorContainer = useRef<HTMLDivElement>(null);
//   let editor: monaco.editor.IStandaloneCodeEditor;

//   useEffect(() => {
//     if(!editorContainer.current) return;

//     editor = monaco.editor.create(editorContainer.current, {
//       value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
//       language: "typescript",
//       minimap: {
//         enabled: false,
//       },
//       theme: "vs-dark",
//     });
//     return () => {
//       editor.dispose();
//     }
//   }, []);

//   return (
//     <>
//       <div ref={editorContainer} ></div>
//     </>
//   );
// } 
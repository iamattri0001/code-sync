import { useState } from "react";
import Editor from "@monaco-editor/react";
import { fontSizes, availableLanguages } from "../constants/editor";

const CodeEditor = () => {
  const [content, setContent] = useState("//code here");
  const [fontSize, setFontSize] = useState(fontSizes[0]);
  const [lang, setLang] = useState("javascript");

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div className="h-full relative">
      <div className="flex items-center absolute z-20 justify-center gap-x-1 right-3 top-2">
        <select
          id="lang-select"
          className="bg-primary-800 outline-none rounded p-1"
          value={lang}
          onChange={(ev) => setLang(ev.target.value)}
        >
          {Object.keys(availableLanguages).map((lang, i) => {
            return (
              <option value={lang} key={i}>
                {availableLanguages[lang].name}
              </option>
            );
          })}
        </select>

        <select
          id="font_size-select"
          className="bg-primary-800 outline-none rounded p-1"
          value={fontSize}
          onChange={(ev) => setFontSize(ev.target.value)}
        >
          {fontSizes.map((size, i) => {
            return (
              <option value={size} key={i}>
                {size}px
              </option>
            );
          })}
        </select>
      </div>
      <Monaco
        lang={lang}
        fontSize={fontSize}
        content={content}
        handleChange={handleChange}
      />
    </div>
  );
};

export default CodeEditor;

const Monaco = ({ content, handleChange, lang, fontSize }) => {
  return (
    <Editor
      className="code-text"
      height="100%"
      width="100%"
      language={lang}
      theme="vs-dark"
      onChange={handleChange}
      value={content}
      options={{
        fontSize,
        fontFamily: "Fira Code, monospace",
      }}
    />
  );
};

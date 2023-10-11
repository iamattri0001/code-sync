import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

import { themes, fontSizes } from "../constants/editor";

// CodeMirror themes
import "codemirror/theme/cobalt.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";

import { ACTION } from "../actions/socketEvents";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const [activeTheme, setActiveTheme] = useState(themes[1] || "monokai");
  const editorRef = useRef();

  const updateFontSize = (size) => {
    const editorElements = Array.from(
      document.getElementsByClassName("CodeMirror")
    );

    editorElements.forEach((element) => {
      element.style.fontSize = `${size}px`;
    });
  };

  async function init() {
    editorRef.current = Codemirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: activeTheme,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    const allEditors = Array.from(
      document.getElementsByClassName("CodeMirror")
    );
    for (let i = 1; i < allEditors.length; i++) {
      allEditors[i].remove();
    }

    updateFontSize(16);

    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if (origin !== "setValue") {
        socketRef.current.emit(ACTION.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [activeTheme]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTION.CODE_CHANGE, ({ code }) => {
        if (code) editorRef.current.setValue(code);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTION.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-end w-[90%] gap-x-4 mb-2 px-2">
        <select
          className="bg-light-500 text-sm outline-none rounded-sm"
          value={activeTheme}
          onChange={(e) => setActiveTheme(e.target.value)}
        >
          {themes.map((theme, i) => {
            return (
              <option key={i} value={theme}>
                {theme}
              </option>
            );
          })}
        </select>

        <select
          className="bg-light-500 text-sm outline-none rounded-sm"
          defaultValue={16}
          onChange={(e) => {
            updateFontSize(e.target.value);
          }}
        >
          {fontSizes.map((size, i) => {
            return (
              <option key={i} value={size}>
                {size}px
              </option>
            );
          })}
        </select>
      </div>
      <textarea id="realtimeEditor"></textarea>;
    </div>
  );
};

export default Editor;

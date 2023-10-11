import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

import "codemirror/theme/material.css";
import { ACTION } from "../actions/socketEvents";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef();
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "material",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        console.log(changes);
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
    init();
  }, []);

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
  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;

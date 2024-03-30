import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
const socket = io('http://localhost:3000');

const App = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  const runCode = () => {
    const iframe = document.getElementById('iframe').contentWindow.document;
    iframe.open();
    iframe.write(`${html}<style>${css}</style><script>${js}</script>`);
    iframe.close();
  };

  const { uuid } = useParams();

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.emit('recompile', { uuid: uuid, html: html, css: css, js: js });
  }, [html, css, js, uuid]);

  return (
    <div>
      <div className="editor-container">
        <Editor
          height="90vh"
          defaultLanguage="html"
          defaultValue={html}
          onChange={setHtml}
          options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
        <Editor
          height="90vh"
          defaultLanguage="css"
          defaultValue={css}
          onChange={setCss}
          options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue={js}
          onChange={setJs}
          options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <button onClick={runCode}>Run</button>
      <iframe id="iframe" title="result" style={{ width: '100%', height: '90vh' }} />
    </div>
  );
};

export default App;
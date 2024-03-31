import React from "react";
import CodeEditor from "./components/codeEditor";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";

export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:roomId" element={<CodeEditor />} />
            </Routes>
    );
}
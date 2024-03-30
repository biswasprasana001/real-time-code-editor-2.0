import React from "react";
import CodeEditor from "./components/codeEditor";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={`/${uuidv4()}`} replace />} />
                <Route path="/:uuid" element={<CodeEditor />} />
            </Routes>
        </Router>
    );
}
// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

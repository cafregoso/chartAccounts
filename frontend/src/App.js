import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import Update from "./Pages/Update/Update";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="chart/:id" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

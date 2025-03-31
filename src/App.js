
import React from "react";
import { BrowserRouter, Routes, Route }from "react-router-dom";
import Home from "./components/Home";
import TempNavigate from "./TempNavigate";
import RecipePage from "./components/RecipePage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <TempNavigate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </BrowserRouter>



export default App;

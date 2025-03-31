<<<<<<< HEAD
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
=======
import React from 'react';
import FilterRecipes from './FilterRecipes'; // Adjust the path if necessary
import './App.css'; // Ensure this file exists and includes any global styles

function App() {
  return (
    <div className="App">
      <FilterRecipes />
    </div>
>>>>>>> 6daff722dd4990a35fea6c3e45f82fa6e48bc8cc
  );
}

export default App;
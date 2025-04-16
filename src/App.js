import React from "react";
import { BrowserRouter, Routes, Route }from "react-router-dom";
import Home from "./components/Home";
import TempNavigate from "./TempNavigate";
import FilterRecipes from './components/FilterRecipes';
import RecipeForm from './components/RecipeForm';
import RecipePage from "./components/RecipePage";
import './App.css';

function App() {
  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <BrowserRouter>
        <TempNavigate />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/form" element={<RecipeForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TempNavigate from "./TempNavigate";
import FilterRecipes from './components/FilterRecipes';
import RecipePage from "./components/RecipePage";
import './App.css';

function App() {
  const handleKeyDown = (event) => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    const currentIndex = focusableElements.indexOf(document.activeElement);

    switch (event.key) {
      case "Enter":
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "A" || activeElement.tagName === "BUTTON")) {
          activeElement.click();
        }
        break;

      case "ArrowDown":
      case "ArrowRight":
        if (currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
          focusableElements[currentIndex + 1].focus();
        }
        break;

      case "ArrowUp":
      case "ArrowLeft":
        if (currentIndex > 0) {
          focusableElements[currentIndex - 1].focus();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <BrowserRouter>
        <TempNavigate />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<RecipePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

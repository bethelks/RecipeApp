
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Screens from HEAD version
import LoginScreen from "./LoginScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

// Screens from origin/master version
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
    <Router>
      <header>
        {/* Displaying the SSL certificate image */}
        <img
          src={`${process.env.PUBLIC_URL}/ssl_certificate.png`}
          alt="SSL Certificate"
          className="ssl-image"
        />
      </header>

      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <TempNavigate />

        <Routes>
          {/* Routes from both branches */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/filter" element={<FilterRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

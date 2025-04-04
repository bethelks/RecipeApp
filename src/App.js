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

      <TempNavigate />

      <Routes>
        {/* Routes from both branches */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/filter" element={<FilterRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;

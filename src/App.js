import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import Home from "./components/Home";
import TempNavigate from "./TempNavigate";
import RecipeForm from './components/RecipeForm';
import RecipePage from "./components/RecipePage";
import Favorites from "./components/Favorites";
import SingleRecipePage from './components/SingleRecipePage';


import './App.css';

function App() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (recipe) => {
        const updatedFavorites = favorites.some(fav => fav.id === recipe.id) 
            ? favorites.filter(fav => fav.id !== recipe.id)
            : [...favorites, recipe];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

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
        <div>
            <div onKeyDown={handleKeyDown} tabIndex={0}>
                <BrowserRouter>
                    <header>
                        <img
                            src={`${process.env.PUBLIC_URL}/ssl_certificate.png`}
                            alt="SSL Certificate"
                            className="ssl-image"
                        />
                    </header>

                    <TempNavigate />

                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/recipe" element={<RecipePage favorites={favorites} toggleFavorite={toggleFavorite} />} />
                        <Route path="/form" element={<RecipeForm />} />
                        <Route path="/favorite" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
                        <Route path="/recipe/:id" element={<SingleRecipePage />} />
                        

                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
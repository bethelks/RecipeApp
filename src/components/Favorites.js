import React, { useEffect, useState } from 'react';
import './Favorites.css'; 

const Favorites = ({ onToggleFavorite }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const removeFavorite = (recipe) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        onToggleFavorite(recipe); 
    };

    return (
        <div className="favorites-page">
            <h1>Your Favorite Recipes</h1>
            {favorites.length === 0 ? (
                <p className="no-favorites">You have no favorite recipes.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((recipe) => (
                        <div className="favorite-card" key={recipe.id}>
                            <img src={recipe.image} alt={recipe.title} className="favorite-image" />
                            <div className="favorite-info">
                                <h2 className="favorite-title">{recipe.title}</h2>
                                <p className="favorite-description">{recipe.description}</p>
                                <button className="remove-favorite-button" onClick={() => removeFavorite(recipe)}>
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

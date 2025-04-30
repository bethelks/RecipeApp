import React from 'react';
import './Favorites.css'; 

const Favorites = ({ favorites, toggleFavorite }) => {
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
                                <button className="remove-favorite-button" onClick={() => toggleFavorite(recipe)}>
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
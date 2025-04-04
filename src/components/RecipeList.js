import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="recipe-info">
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-description">{recipe.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
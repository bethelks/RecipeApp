// Recipe.js
import React, { useState } from 'react';
import './Recipe.css'; // Import the styles for the recipe page

const Recipe = ({ recipeData }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleIngredients = () => setShowIngredients(!showIngredients);
  const toggleInstructions = () => setShowInstructions(!showInstructions);

  return (
    <div className="recipe-container">
      <h1 className="recipe-title">{recipeData.title}</h1>
      <p className="recipe-author">By {recipeData.author}</p>
      
      <div className="recipe-details">
        <button onClick={toggleIngredients} className="recipe-toggle-btn">
          {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
        </button>
        {showIngredients && (
          <ul className="recipe-ingredients">
            {recipeData.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient}</li>
            ))}
          </ul>
        )}
        
        <button onClick={toggleInstructions} className="recipe-toggle-btn">
          {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
        </button>
        {showInstructions && (
          <div className="recipe-instructions">
            <p>{recipeData.instructions}</p>
          </div>
        )}
      </div>
      
      <div className="recipe-review-section">
        {/* Include a Review Component here if needed */}
        {/* <ReviewComponent /> */}
      </div>
    </div>
  );
}

export default Recipe;

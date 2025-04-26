import React from "react";
import { useParams } from "react-router-dom";
import { recipes } from "../RecipesData"; // Adjust the path if needed
import "./RecipePage.css";

function RecipePage() {
  const { id } = useParams();
  console.log("URL id:", id);
  console.log("Available recipes:", recipes);

  const recipe = recipes.find((r) => r.id.toLowerCase() === id.toLowerCase());
  console.log("Matched recipe:", recipe);

  if (!recipe) {
    return <div>Recipe not found 😢</div>;
  }

  return (
    <div className="recipe-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />

      <div className="recipe-details">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="extra-info">
          <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
          <p><strong>Nutritional Info:</strong> {recipe.nutrition}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;

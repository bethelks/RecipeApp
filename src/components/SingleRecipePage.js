// SingleRecipePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { recipes } from '../RecipesData';
import './SingleRecipePage.css';

const SingleRecipePage = () => {
  const { id } = useParams();
  const recipe = recipes.find(r =>
    r.title.toLowerCase().replace(/\s+/g, '-') === id
  );

  if (!recipe) {
    return <div className="recipe-detail"><h2>Recipe not found 😳</h2></div>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={{ width: '300px' }} />
      )}
      <p><strong>Prep Time:</strong> {recipe.prepTime || 'N/A'}</p>
      <p><strong>Nutrition:</strong> {recipe.nutrition || 'N/A'}</p>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients?.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h3>Instructions:</h3>
      <ol>
        {(Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions]).map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default SingleRecipePage;

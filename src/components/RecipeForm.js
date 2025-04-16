import React, { useState } from 'react';
import './RecipeForm.css';

function RecipeForm() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');

  const [selectedMealTags, setSelectedMealTags] = useState([]);
  const [selectedDietTags, setSelectedDietTags] = useState([]);
  const [selectedDifficultyTags, setSelectedDifficultyTags] = useState([]);
  const [prepTime, setPrepTime] = useState(''); // State for preparation time

  const toggleTag = (tag, selectedTags, setSelectedTags, isSingleSelect = false) => {
    if (isSingleSelect) {
      // For single-select tags, set the selected tag to the current one or clear it if already selected
      setSelectedTags(selectedTags.includes(tag) ? [] : [tag]);
    } else {
      // For multi-select tags, toggle the tag as usual
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const addIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  const handleIngredientClick = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission using selectedMealTags, selectedDietTags, selectedDifficultyTags, and prepTime
  };

  const mealTags = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  const dietTags = ['Vegetarian', 'Vegan', 'Low-carb', 'Gluten-free', 'Lactose-free', 'Nut-free', 'Soy-free', 'Egg-free'];
  const difficultyTags = ['Easy', 'Medium', 'Difficult'];

  return (
    <div className="recipe-form-container">
      <h1>Create a Recipe</h1>
      <form id="recipeForm" onSubmit={handleSubmit}>

        {/* Recipe Name */}
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name:</label>
          <input type="text" id="recipeName" name="recipeName" required />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="recipeDescription">Description:</label>
          <textarea id="recipeDescription" name="recipeDescription" rows="4" required></textarea>
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <div className="ingredient">
            <input
              type="text"
              id="ingredientInput"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="Enter ingredient"
            />
            <button type="button" id="addIngredientButton" onClick={addIngredient}>
              Add Ingredient
            </button>
          </div>

          <div id="ingredientList" className="ingredient-list-box">
            {ingredients.length === 0 ? (
              <span className="no-ingredients-text">No ingredients added yet</span>
            ) : (
              ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="ingredient-tag"
                  onClick={() => handleIngredientClick(index)}
                >
                  {ingredient}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" name="instructions" rows="6" required></textarea>
        </div>

        {/* Preparation Time */}
        <div className="form-group">
          <label htmlFor="prepTime">Preparation Time (minutes):</label>
          <select 
            id="prepTime" 
            name="prepTime" 
            value={prepTime} 
            onChange={(e) => setPrepTime(e.target.value)} 
            required
          >
            <option value="">Select Time</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        {/* Cuisine Type */}
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine Type:</label>
          <select id="cuisine" name="cuisine" required>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Meal Type Tags */}
        <div className="form-group">
          <label>Meal Type:</label>
          <div className="tag-container">
            {mealTags.map(tag => (
              <div
                key={tag}
                className={`tag ${selectedMealTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag, selectedMealTags, setSelectedMealTags)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions Tags */}
        <div className="form-group">
          <label>Dietary Restrictions:</label>
          <div className="tag-container">
            {dietTags.map(tag => (
              <div
                key={tag}
                className={`tag ${selectedDietTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag, selectedDietTags, setSelectedDietTags)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Tags */}
        <div className="form-group">
          <label>Difficulty:</label>
          <div className="tag-container">
            {difficultyTags.map((tag) => (
              <div
                key={tag}
                className={`tag ${selectedDifficultyTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag, selectedDifficultyTags, setSelectedDifficultyTags, true)} // Pass true for single-select
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="form-footer">
          <button type="submit">Submit Recipe</button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
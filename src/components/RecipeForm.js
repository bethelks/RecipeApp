import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeForm.css';

function RecipeForm({ onAddRecipe }) {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedMealTags, setSelectedMealTags] = useState([]);
  const [selectedDietTags, setSelectedDietTags] = useState([]);
  const [selectedDifficultyTags, setSelectedDifficultyTags] = useState([]);
  const [prepTime, setPrepTime] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const toggleTag = (tag, selectedTags, setSelectedTags, isSingleSelect = false) => {
    if (isSingleSelect) {
      setSelectedTags(selectedTags.includes(tag) ? [] : [tag]);
    } else {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const addIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleIngredientClick = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the base64 string for preview
        setImage(reader.result); // Save the base64 string to the recipe data
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const recipeData = {
      title: recipeName,
      description,
      ingredients,
      instructions,
      prepTime: parseInt(prepTime, 10), // Convert to a number
      cuisine,
      mealTags: selectedMealTags,
      dietTags: selectedDietTags,
      difficulty: selectedDifficultyTags[0] || '',
      image,
    };
  
    console.log('Submitting recipe:', recipeData);
  
    // Save the recipe to LocalStorage
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    existingRecipes.push(recipeData);
    localStorage.setItem("recipes", JSON.stringify(existingRecipes));
  
    // Reset all fields after submit
    setRecipeName('');
    setDescription('');
    setIngredients([]);
    setIngredientInput('');
    setInstructions('');
    setPrepTime('');
    setCuisine('');
    setSelectedMealTags([]);
    setSelectedDietTags([]);
    setSelectedDifficultyTags([]);
    setImage(null);
    setImagePreview(null);
  
    // Pass the new recipe to the parent component
    if (onAddRecipe) {
      onAddRecipe(recipeData); // Call the function passed as a prop
    }
  
    // Navigate after successful submit
    navigate('/recipe');
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
          <input
            type="text"
            id="recipeName"
            name="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="recipeDescription">Description:</label>
          <textarea
            id="recipeDescription"
            name="recipeDescription"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
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
          <textarea
            id="instructions"
            name="instructions"
            rows="6"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

       {/* Preparation Time */}
      <div className="form-group">
        <label htmlFor="prepTime">Preparation Time:</label>
        <select
          id="prepTime"
          name="prepTime"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)} // Use prepTime and setPrepTime
          required
        >
          <option value="">None</option>
          <option value="5">5 minutes or less</option>
          <option value="10">10 minutes or less</option>
          <option value="15">15 minutes or less</option>
          <option value="20">20 minutes or less</option>
          <option value="30">30 minutes or less</option>
          <option value="45">45 minutes or less</option>
          <option value="60">60+ minutes or less</option>
        </select>
      </div>

        {/* Cuisine Type */}
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine Type:</label>
          <select
            id="cuisine"
            name="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          >
            <option value="">Select Cuisine</option>
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
            {mealTags.map((tag) => (
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
            {dietTags.map((tag) => (
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
                onClick={() => toggleTag(tag, selectedDifficultyTags, setSelectedDifficultyTags, true)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Image */}
        <div className="form-group">
          <label htmlFor="imageUpload">Upload an Image:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Recipe Preview"
                style={{ width: '200px', marginTop: '10px' }}
              />
            </div>
          )}
        </div>

        <div className="form-footer">
          <button type="submit">Submit Recipe</button>
        </div>

      </form>
    </div>
  );
}

export default RecipeForm;

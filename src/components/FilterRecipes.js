import React, { useState, useRef, useEffect } from 'react';
import './FilterRecipes.css';

const FilterRecipes = ({ allRecipes, setFilteredRecipes }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false,
    soyFree: false,
    eggFree: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [mealTags, setMealTags] = useState([]);
  const [dietTags, setDietTags] = useState([]);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
    applyFilters(); // Reapply filters whenever filters or search term change
  }, [filters, searchTerm, cookingTime, cuisine, difficulty, mealTags, dietTags]);

  const applyFilters = () => {
    const filtered = allRecipes.filter((recipe) => {
      const matchesSearchTerm = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters =
        (!filters.vegetarian || recipe.vegetarian) &&
        (!filters.vegan || recipe.vegan) &&
        (!filters.lowCarb || recipe.lowCarb) &&
        (!filters.glutenFree || recipe.glutenFree) &&
        (!filters.lactoseFree || recipe.lactoseFree) &&
        (!filters.nutFree || recipe.nutFree) &&
        (!filters.soyFree || recipe.soyFree) &&
        (!filters.eggFree || recipe.eggFree) &&
        (!mealTags.length || mealTags.every((tag) => recipe.mealTags?.includes(tag))) &&
        (!dietTags.length || dietTags.every((tag) => recipe.dietTags?.includes(tag))) &&
        (!cookingTime || parseInt(recipe.prepTime, 10) < parseInt(cookingTime, 10)) && // Handles "60 minutes or less"
        (!cuisine || recipe.cuisine?.toLowerCase() === cuisine.toLowerCase()) &&
        (!difficulty || recipe.difficulty?.toLowerCase() === difficulty.toLowerCase());
  
      return matchesSearchTerm && matchesFilters;
    });
  
    setFilteredRecipes(filtered);
  };

  const toggleTag = (tag, selectedTags, setSelectedTags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCookingTimeChange = (value) => {
    setCookingTime(value); // Update cooking time directly
  };

  const handleCuisineChange = (value) => {
    setCuisine(value); // Update cuisine directly
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value); // Update difficulty directly
  };

  return (
    <div className="filter-recipes">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
        />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <h3>Filters</h3>

        {/* Meal Tags */}
        <div>
          <h4>Meal Tags</h4>
          {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'].map((tag) => (
            <div
              key={tag}
              className={`tag ${mealTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag, mealTags, setMealTags)}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Diet Tags */}
        <div>
          <h4>Diet Tags</h4>
          {[
            'Vegetarian',
            'Vegan',
            'Low-carb',
            'Gluten-free',
            'Lactose-free',
            'Nut-free',
            'Soy-free',
            'Egg-free',
          ].map((tag) => (
            <div
              key={tag}
              className={`tag ${dietTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag, dietTags, setDietTags)}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Preparation Time */}
        <div>
          <h4>Preparation Time</h4>
          <select
            value={cookingTime}
            onChange={(e) => handleCookingTimeChange(e.target.value)}
          >
            <option value="">None</option>
            <option value="5">Less than 5 minutes</option>
            <option value="10">Less than 10 minutes</option>
            <option value="15">Less than 15 minutes</option>
            <option value="20">Less than 20 minutes</option>
            <option value="30">Less than 30 minutes</option>
            <option value="45">Less than 45 minutes</option>
            <option value="60">60+ minutes or less</option>
          </select>
        </div>

        {/* Cuisine Type */}
        <div>
          <h4>Cuisine Type</h4>
          <select
            value={cuisine}
            onChange={(e) => handleCuisineChange(e.target.value)}
          >
            <option value="">None</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <h4>Difficulty</h4>
          <select
            value={difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            <option value="">None</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar Button */}
      <button
        className={`sidebar-button ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Filter ☰
      </button>
    </div>
  );
};

export default FilterRecipes;
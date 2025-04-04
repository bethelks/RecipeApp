import React, { useState, useEffect } from 'react';
import { allRecipes } from './RecipePage';  // Import the real recipe data
import SearchBar from './SearchBar';  // Your SearchBar component
import FilterRecipes from './FilterRecipes';  // Your friend's FilterRecipes component
import RecipeList from './RecipeList';  // Displaying filtered recipes

const SearchRecipeParent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes); // Set default to all recipes

  useEffect(() => {
    const filtered = allRecipes.filter((recipe) => {
      const matchesSearchTerm = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearchTerm;  // Filter based on search term
    });

    setFilteredRecipes(filtered);  // Update filtered recipes based on search term
  }, [searchTerm]);

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <FilterRecipes 
        allRecipes={allRecipes}  
        setFilteredRecipes={setFilteredRecipes}  
        searchTerm={searchTerm}  
      />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default SearchRecipeParent;
// This component combines the SearchBar, FilterRecipes, and RecipeList components.
// It allows users to search for recipes and see the filtered results.
// The filtered recipes are updated based on the search term entered in the SearchBar component.
import React, { useState, useEffect } from 'react';
import { allRecipes } from './RecipePage';
import SearchBar from './SearchBar';
import FilterRecipes from './FilterRecipes';
import RecipeList from './RecipeList';

const SearchRecipeParent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
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

    // Update filtered recipes based on search term and filters
    useEffect(() => {
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
                (!filters.eggFree || recipe.eggFree);

            return matchesSearchTerm && matchesFilters;
        });

        setFilteredRecipes(filtered);
    }, [searchTerm, filters]);

    return (
        <div>
            <SearchBar setSearchTerm={setSearchTerm} />
            <FilterRecipes 
                allRecipes={allRecipes}
                setFilteredRecipes={setFilteredRecipes}
                filters={filters}
                setFilters={setFilters} // Pass setFilters to FilterRecipes
            />
            <RecipeList recipes={filteredRecipes} />
        </div>
    );
};

export default SearchRecipeParent;
import React, { useState, useEffect } from 'react';
import './RecipePage.css'; // Optional: Add your styles for this page
import SearchBar from './SearchBar'; // Make sure you've created this component
import FilterRecipes from './FilterRecipes'; // Make sure you've created this component
import RecipeList from './RecipeList'; // Make sure you've created this component

export const allRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    image: 'https://cdn.pixabay.com/photo/2011/04/29/11/22/spaghetti-7115_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 2,
    title: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, basil, and a drizzle of olive oil and balsamic vinegar.',
    image: 'https://media.istockphoto.com/id/1345888788/photo/caprese-salad.webp?s=2048x2048&w=is&k=20&c=-32fLOWVCRAcSptqBkUtwcmeasztpqrDqvzU14nhhL0=',
    vegetarian: true,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 3,
    title: 'Chicken Tikka Masala',
    description: 'Tender pieces of chicken in a spiced tomato gravy, served with rice or naan.',
    image: 'https://media.istockphoto.com/id/967274038/photo/homemade-chicken-tikka-masala.webp?s=2048x2048&w=is&k=20&c=CNG4IyE4nwTWR_uspYKIyAzBFz1MvObxhmolOpodR7E=',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 4,
    title: 'Beef Stir-fry',
    description: 'Quick and easy stir-fry with thinly sliced beef, bell peppers, and broccoli.',
    image: 'https://cdn.pixabay.com/photo/2019/09/05/01/08/food-4452838_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: false,
    lactoseFree: true,
    nutFree: true,
    soyFree: false,
    eggFree: true,
  },
  {
    id: 5,
    title: 'Vegetable Curry',
    description: 'A rich and flavorful curry with mixed vegetables and a blend of spices.',
    image: 'https://cdn.pixabay.com/photo/2021/06/10/02/31/rice-6324799_1280.jpg',
    vegetarian: true,
    vegan: true,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 6,
    title: 'Chocolate Chip Cookies',
    description: 'Classic cookies loaded with chocolate chips, perfect for any time of day.',
    image: 'https://cdn.pixabay.com/photo/2023/06/22/22/29/cookies-8082386_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false,
    soyFree: true,
    eggFree: false,
  },
];

const RecipePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes); // Initially display all recipes

  // Effect for filtering recipes based on search term
  useEffect(() => {
    const filtered = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm]);

  return (
    <div className="recipe-page">
      <h1>Recipe Search</h1>
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

export default RecipePage;
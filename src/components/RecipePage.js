import React, { useState, useEffect } from 'react';
import './RecipePage.css'; 
import SearchBar from './SearchBar'; 
import FilterRecipes from './FilterRecipes'; 
import RecipeList from './RecipeList'; 

const allRecipes = [
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
  // New recipes begin here
  {
    id: 7,
    title: 'Vegetable Stir-fry',
    description: 'A colorful mix of vegetables stir-fried with soy sauce and garlic.',
    image: 'https://cdn.pixabay.com/photo/2016/11/19/17/13/stir-fry-1847962_1280.jpg',
    vegetarian: true,
    vegan: true,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 8,
    title: 'Greek Salad',
    description: 'A refreshing salad with cucumbers, tomatoes, olives, feta cheese, and olive oil.',
    image: 'https://cdn.pixabay.com/photo/2020/06/29/18/36/salad-3480517_1280.jpg',
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
    id: 9,
    title: 'Shrimp Tacos',
    description: 'Flaky shrimp wrapped in corn tortillas with cabbage and lime crema.',
    image: 'https://cdn.pixabay.com/photo/2020/07/25/18/48/tacos-5515481_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 10,
    title: 'Lentil Soup',
    description: 'A hearty soup made with lentils, vegetables, and herbs.',
    image: 'https://cdn.pixabay.com/photo/2017/01/06/16/29/lentil-1950276_1280.jpg',
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
    id: 11,
    title: 'Pancakes',
    description: 'Fluffy pancakes served with syrup and fresh fruit.',
    image: 'https://cdn.pixabay.com/photo/2016/10/05/06/14/pancakes-1725304_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 12,
    title: 'Quinoa Salad',
    description: 'A nutritious salad with quinoa, black beans, corn, and lime vinaigrette.',
    image: 'https://cdn.pixabay.com/photo/2018/01/25/16/22/quinoa-1953652_1280.jpg',
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
    id: 13,
    title: 'Beef Tacos',
    description: 'Delicious ground beef tacos topped with lettuce and cheese.',
    image: 'https://cdn.pixabay.com/photo/2016/09/18/14/43/taco-1586007_1280.jpg',
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
    id: 14,
    title: 'Baked Salmon',
    description: 'Tender salmon fillets baked with lemon and herbs.',
    image: 'https://cdn.pixabay.com/photo/2016/03/08/19/34/salmon-1247329_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 15,
    title: 'Chickpea Salad',
    description: 'A refreshing salad with chickpeas, cucumber, and a lemon dressing.',
    image: 'https://cdn.pixabay.com/photo/2019/01/28/07/08/salad-3961571_1280.jpg',
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
    id: 16,
    title: 'Mushroom Risotto',
    description: 'Creamy arborio rice cooked with mushrooms and Parmesan cheese.',
    image: 'https://cdn.pixabay.com/photo/2016/10/10/00/40/mushroom-1722850_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 17,
    title: 'Eggplant Parmesan',
    description: 'Breaded eggplant baked with marinara sauce and mozzarella cheese.',
    image: 'https://cdn.pixabay.com/photo/2016/01/28/21/39/eggplant-1166174_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 18,
    title: 'Tuna Salad',
    description: 'Flaky tuna mixed with mayo, celery, and served on a bed of greens.',
    image: 'https://cdn.pixabay.com/photo/2017/12/09/11/54/tuna-3018268_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 19,
    title: 'Fruit Smoothie',
    description: 'A refreshing mix of fruits blended with yogurt or juice.',
    image: 'https://cdn.pixabay.com/photo/2016/04/19/18/52/smoothie-1332056_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 20,
    title: 'Stuffed Bell Peppers',
    description: 'Bell peppers filled with a mixture of rice, beans, and cheese.',
    image: 'https://cdn.pixabay.com/photo/2015/08/03/05/32/food-837990_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 21,
    title: 'Pumpkin Soup',
    description: 'A creamy soup made with fresh pumpkin and spices.',
    image: 'https://cdn.pixabay.com/photo/2020/10/31/22/47/pumpkin-soup-5121981_1280.jpg',
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
    id: 22,
    title: 'Beef and Broccoli',
    description: 'Tender beef stir-fried with broccoli and soy sauce.',
    image: 'https://cdn.pixabay.com/photo/2019/02/15/14/09/beef-and-broccoli-3190807_1280.jpg',
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
    id: 23,
    title: 'BBQ Chicken',
    description: 'Grilled chicken thighs slathered in barbecue sauce.',
    image: 'https://cdn.pixabay.com/photo/2020/01/11/23/51/chicken-4765515_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 24,
    title: 'Carrot Cake',
    description: 'Moist carrot cake topped with cream cheese frosting.',
    image: 'https://cdn.pixabay.com/photo/2015/09/30/16/21/cake-981426_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 25,
    title: 'Falafel Wrap',
    description: 'Crispy falafel served in a wrap with salad and tahini.',
    image: 'https://cdn.pixabay.com/photo/2016/10/20/11/48/falafel-975852_1280.jpg',
    vegetarian: true,
    vegan: true,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: true,
    nutFree: false,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 26,
    title: 'Coconut Curry',
    description: 'A tropical coconut curry made with seasonal vegetables.',
    image: 'https://cdn.pixabay.com/photo/2017/05/08/20/41/curry-2291620_1280.jpg',
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
    id: 27,
    title: 'Chicken Caesar Salad',
    description: 'Romaine lettuce, grilled chicken, Parmesan, and Caesar dressing.',
    image: 'https://cdn.pixabay.com/photo/2016/07/21/18/15/caesar-salad-1533115_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 28,
    title: 'Chocolate Mousse',
    description: 'Rich and creamy dessert made with dark chocolate and whipped cream.',
    image: 'https://cdn.pixabay.com/photo/2017/09/19/17/03/mousse-2761333_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 29,
    title: 'Mango Smoothie Bowl',
    description: 'A creamy mango smoothie topped with fresh fruit and nuts.',
    image: 'https://cdn.pixabay.com/photo/2020/08/21/17/06/mango-5511198_1280.jpg',
    vegetarian: true,
    vegan: true,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: true,
    nutFree: false,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 30,
    title: 'Stuffed Zucchini',
    description: 'Zucchini boats filled with a mix of ground meat and rice.',
    image: 'https://cdn.pixabay.com/photo/2020/10/26/21/40/zucchini-plant-5110567_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 31,
    title: 'Chili Con Carne',
    description: 'Hearty chili made with ground beef, beans, and spices.',
    image: 'https://cdn.pixabay.com/photo/2018/10/01/20/39/chili-3708326_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 32,
    title: 'Jambalaya',
    description: 'A Creole dish with a mix of rice, seafood, and sausage.',
    image: 'https://cdn.pixabay.com/photo/2017/10/03/15/09/jambalaya-2811950_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 33,
    title: 'Pesto Pasta',
    description: 'Pasta tossed with a vibrant basil pesto sauce.',
    image: 'https://cdn.pixabay.com/photo/2015/05/10/09/53/pasta-756850_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 34,
    title: 'Vegetable Frittata',
    description: 'A baked egg dish filled with seasonal vegetables and cheese.',
    image: 'https://cdn.pixabay.com/photo/2016/09/01/05/54/omelette-1638148_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 35,
    title: 'Baked Potatoes',
    description: 'Oven-baked potatoes topped with butter, sour cream, and chives.',
    image: 'https://cdn.pixabay.com/photo/2020/06/01/06/24/potatoes-5240471_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 36,
    title: 'Ratatouille',
    description: 'A classic French Provencal dish made of layered vegetables.',
    image: 'https://cdn.pixabay.com/photo/2020/03/30/12/08/ratatouille-4968077_1280.jpg',
    vegetarian: true,
    vegan: true,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 37,
    title: 'Banana Bread',
    description: 'Moist and delicious banana bread, perfect for breakfast or a snack.',
    image: 'https://cdn.pixabay.com/photo/2020/01/04/05/08/banana-bread-4748584_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 38,
    title: 'Grilled Cheese Sandwich',
    description: 'Classic grilled cheese with melty cheese and buttery bread.',
    image: 'https://cdn.pixabay.com/photo/2017/06/24/11/03/grilled-cheese-2438305_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false,
    soyFree: true,
    eggFree: false,
  },
  {
    id: 39,
    title: 'Biryani',
    description: 'A fragrant rice dish with spices, meat, and vegetables.',
    image: 'https://cdn.pixabay.com/photo/2018/04/06/16/48/biryani-4108843_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 40,
    title: 'Lasagna',
    description: 'Layers of pasta, meat, cheese, and marinara sauce baked to perfection.',
    image: 'https://cdn.pixabay.com/photo/2015/07/31/20/20/lasagna-843867_1280.jpg',
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
    id: 41,
    title: 'Tom Yum Soup',
    description: 'A flavorful Thai soup made with shrimp, lemongrass, and chili.',
    image: 'https://cdn.pixabay.com/photo/2016/11/22/20/12/tom-yum-1845188_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 42,
    title: 'Chai Latte',
    description: 'A spiced tea latte made with milk, tea, and an assortment of spices.',
    image: 'https://cdn.pixabay.com/photo/2017/02/06/12/04/chai-latte-2046298_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: true,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 43,
    title: 'Olive Tapenade',
    description: 'A savory spread made with olives, capers, and anchovies, great with crostini.',
    image: 'https://cdn.pixabay.com/photo/2020/05/21/16/15/sandwich-5201235_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 44,
    title: 'Pork Chops',
    description: 'Juicy pork chops seasoned and grilled to perfection.',
    image: 'https://cdn.pixabay.com/photo/2016/08/07/01/34/pork-chops-1579605_1280.jpg',
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    glutenFree: true,
    lactoseFree: true,
    nutFree: true,
    soyFree: true,
    eggFree: true,
  },
  {
    id: 45,
    title: 'Apple Pie',
    description: 'A classic dessert made with tender apples and a flaky crust.',
    image: 'https://cdn.pixabay.com/photo/2015/09/21/12/12/apple-pie-955488_1280.jpg',
    vegetarian: true,
    vegan: false,
    lowCarb: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    soyFree: true,
    eggFree: false,
  },
];

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]); // All recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({}); // Active filter criteria

  useEffect(() => {
    // Retrieve user-created recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    // Combine stored recipes with the allRecipes
    const combinedRecipes = [...storedRecipes, ...allRecipes];
    setRecipes(combinedRecipes);
    setFilteredRecipes(combinedRecipes); // Initialize filteredRecipes with all recipes
  }, []); 

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter recipes based on search term
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) 
    );
    setFilteredRecipes(filtered);
  };

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.includes(recipe)
      ? favorites.filter((fav) => fav !== recipe)
      : [...favorites, recipe];
    setFavorites(updatedFavorites);
  };

  const applyFilters = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);

    // Filter the recipes based on selected filters
    const filtered = recipes.filter((recipe) => {
      return Object.keys(newFilters).every((key) => {
        if (!newFilters[key]) return true; // If the filter isn't active, don't filter by it
        return recipe[key] === true;
      });
    });

    setFilteredRecipes(filtered);
  };

  return (
    <div className="recipe-page-container">
      <h1>Recipe Page</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <FilterRecipes 
          allRecipes={recipes} 
          setFilteredRecipes={setFilteredRecipes} 
          applyFilters={applyFilters} 
        />
      </div>

      {/* Recipe List */}
      <div className="recipe-list">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          filteredRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>

              {/* Image Display */}
              {recipe.image && (
                <div className="image-container">
                  <img
                    src={recipe.image}
                    alt={`${recipe.title} preview`}
                    style={{ width: '200px', marginTop: '10px' }}
                  />
                </div>
              )}

              {/* Ingredients */}
              <div className="ingredients">
                <strong>Ingredients:</strong>
                <ul>
                  {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="instructions">
                <strong>Instructions:</strong>
                <p>{recipe.instructions}</p>
              </div>

              {/* Difficulty */}
              {recipe.difficulty && (
                <div className="difficulty">
                  <strong>Difficulty:</strong> {recipe.difficulty}
                </div>
              )}

              {/* Tags */}
              <div className="tags">
                <strong>Meal Tags:</strong>
                <ul>
                  {recipe.mealTags && recipe.mealTags.map((tag, idx) => (
                    <li key={idx}>{tag}</li>
                  ))}
                </ul>
                <strong>Diet Tags:</strong>
                <ul>
                  {recipe.dietTags && recipe.dietTags.map((tag, idx) => (
                    <li key={idx}>{tag}</li>
                  ))}
                </ul>
              </div>

              {/* Favorite Button */}
              <button onClick={() => toggleFavorite(recipe)}>
                {favorites.includes(recipe) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipePage;
import React, { useState, useEffect } from 'react';
import './RecipePage.css'; 
import SearchBar from './SearchBar'; 
import FilterRecipes from './FilterRecipes'; 
import RecipeList from './RecipeList'; 
import RecipeReview from './RecipeReview';

const allRecipes = [
  {
    id: "spaghetti-carbonara",
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    image: "https://th.bing.com/th/id/OIP.WDjLazx9UFOY6TGCQsxcEAHaE3?w=272&h=180&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g pecorino cheese",
      "Black pepper"
    ],
    instructions: "Cook spaghetti in salted water until al dente. Fry pancetta until crisp. Beat eggs with grated cheese and pepper. Drain pasta, mix with pancetta and egg mixture off heat. Serve immediately.",
    prepTime: 25,
    cuisine: "Italian",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Nut-free"],
    difficulty: "Medium"
  },
  
    {
    id: "caprese-salad",
    title: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and basil drizzled with olive oil and balsamic vinegar.",
    image: "https://th.bing.com/th/id/OSK.73e282e3b9cc5dfdc06c6fab7ae1488d?w=220&h=220&rs=2&qlt=80&o=6&cdv=1&pid=16.1",
    ingredients: [
      "2 large ripe tomatoes",
      "200g fresh mozzarella",
      "Fresh basil leaves",
      "2 tablespoons extra virgin olive oil",
      "1 tablespoon balsamic vinegar",
      "Salt",
      "Black pepper"
    ],
    instructions: "Slice tomatoes and mozzarella into rounds. Arrange alternately with basil. Drizzle oil and vinegar. Season with salt and pepper. Chill briefly or serve immediately.",
    prepTime: 10,
    cuisine: "Italian",
    mealTags: ["Lunch", "Snack"],
    dietTags: ["Vegetarian", "Gluten-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "chicken-tikka-masala",
    title: "Chicken Tikka Masala",
    description: "Chicken in a creamy spiced tomato sauce, served with rice or naan.",
    image: "https://www.modernhoney.com/wp-content/uploads/2018/10/Chicken-Tikka-Masala-1-c.jpg",
    ingredients: [
      "500g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tablespoons tikka masala spice mix",
      "1 large onion, chopped",
      "400g canned tomatoes",
      "1/2 cup heavy cream",
      "Fresh cilantro for garnish"
    ],
    instructions: "Marinate chicken in yogurt and spices. Cook until browned. Sauté onions. Add tomatoes and simmer. Stir in cream and chicken. Garnish with cilantro.",
    prepTime: 45,
    cuisine: "Indian",
    mealTags: ["Dinner"],
    dietTags: ["Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "beef-stir-fry",
    title: "Beef Stir-fry",
    description: "Quick stir-fried beef with colorful vegetables in soy-oyster sauce.",
    image: "https://cdn.pixabay.com/photo/2019/09/05/01/08/food-4452838_1280.jpg",
    ingredients: [
      "300g beef sirloin, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 small broccoli head, cut into florets",
      "2 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 tablespoon vegetable oil",
      "1 teaspoon cornstarch"
    ],
    instructions: "Coat beef with cornstarch. Stir-fry beef and set aside. Stir-fry vegetables. Add sauces and beef. Toss and serve over rice or noodles.",
    prepTime: 30,
    cuisine: "Chinese",
    mealTags: ["Dinner"],
    dietTags: ["Nut-free", "Egg-free"],
    difficulty: "Medium"
  },
  {
    id: "vegetable-curry",
    title: "Vegetable Curry",
    description: "A rich coconut-based curry packed with colorful vegetables.",
    image: "https://cdn.pixabay.com/photo/2021/06/10/02/31/rice-6324799_1280.jpg",
    ingredients: [
      "1 tablespoon vegetable oil",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 tablespoon curry powder",
      "1 carrot, sliced",
      "1 cup cauliflower florets",
      "1 cup green beans",
      "400g canned coconut milk",
      "Salt to taste"
    ],
    instructions: "Sauté onion and garlic. Add curry powder. Stir in vegetables and coconut milk. Simmer until tender. Season and serve with rice or naan.",
    prepTime: 35,
    cuisine: "Indian",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Medium"
  },
  {
    id: "chocolate-chip-cookies",
    title: "Chocolate Chip Cookies",
    description: "Crispy on the edges, chewy in the middle—classic chocolate chip cookies.",
    image: "https://cdn.pixabay.com/photo/2023/06/22/22/29/cookies-8082386_1280.jpg",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup butter, softened",
      "3/4 cup white sugar",
      "3/4 cup brown sugar",
      "2 cups chocolate chips"
    ],
    instructions: "Cream butter and sugars. Beat in eggs and vanilla. Mix in dry ingredients and chocolate chips. Drop spoonfuls on sheet and bake at 375°F (190°C) for 8–10 minutes.",
    prepTime: 25,
    cuisine: "American",
    mealTags: ["Snack", "Dessert"],
    dietTags: ["Soy-free"],
    difficulty: "Easy"
  },
  {
    id: "vegetable-stir-fry",
    title: "Vegetable Stir-fry",
    description: "Colorful vegetables stir-fried with soy, hoisin, and ginger.",
    image: "https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg",
    ingredients: [
      "1 tablespoon sesame oil",
      "1 red bell pepper, sliced",
      "1 cup snap peas",
      "1 cup broccoli florets",
      "2 tablespoons soy sauce",
      "1 tablespoon hoisin sauce",
      "1 teaspoon ginger, grated"
    ],
    instructions: "Heat sesame oil in a wok. Stir-fry bell pepper, snap peas, and broccoli. Add soy sauce, hoisin, and ginger. Cook until tender-crisp and serve hot with rice or noodles.",
    prepTime: 20,
    cuisine: "Asian",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Nut-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "greek-salad",
    title: "Greek Salad",
    description: "A fresh, classic Mediterranean salad with feta, olives, and veggies.",
    image: "https://hips.hearstapps.com/hmg-prod/images/greek-salad-lead-642f29241cceb.jpg?crop=1xw:1xh;center,top&resize=1200:*",
    ingredients: [
      "2 cucumbers, diced",
      "4 tomatoes, diced",
      "1 red onion, thinly sliced",
      "100g feta cheese, cubed",
      "1/2 cup Kalamata olives",
      "2 tablespoons olive oil",
      "1 tablespoon red wine vinegar"
    ],
    instructions: "Combine cucumbers, tomatoes, onion, feta, and olives. Drizzle with olive oil and vinegar. Toss gently. Season and serve chilled.",
    prepTime: 15,
    cuisine: "Mediterranean",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Gluten-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "shrimp-tacos",
    title: "Shrimp Tacos",
    description: "Juicy shrimp tacos with cabbage, avocado, and lime crema.",
    image: "https://bowl-me-over.com/wp-content/uploads/2020/05/Grilled-Shrimp-Tacos.jpg",
    ingredients: [
      "400g shrimp, peeled and deveined",
      "8 small corn tortillas",
      "1 cup shredded cabbage",
      "1 avocado, sliced",
      "2 tablespoons lime juice",
      "1 tablespoon olive oil",
      "1 teaspoon chili powder"
    ],
    instructions: "Toss shrimp in olive oil, lime juice, and chili powder. Cook in skillet. Fill tortillas with shrimp, cabbage, and avocado. Add more lime juice and serve.",
    prepTime: 20,
    cuisine: "Mexican",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "lentil-soup",
    title: "Lentil Soup",
    description: "A warm and hearty soup made with lentils, vegetables, and spices.",
    image: "https://th.bing.com/th/id/OIP.n-AnRmLIy8BgogFZaG00ywHaId?w=203&h=233&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 cup dried lentils",
      "1 onion, diced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "4 cups vegetable broth",
      "1 teaspoon cumin",
      "2 tablespoons olive oil"
    ],
    instructions: "Sauté onion, carrots, and celery in olive oil. Add lentils, cumin, and broth. Simmer for 30–35 minutes. Season and serve.",
    prepTime: 45,
    cuisine: "Middle Eastern",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Medium"
  },
  {
    id: "pancakes",
    title: "Pancakes",
    description: "Fluffy golden pancakes perfect for breakfast or brunch.",
    image: "https://th.bing.com/th/id/OIP.6Big7_0sHJWmJ4_Ffky_IAHaHa?w=203&h=203&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "3 1/2 teaspoons baking powder",
      "1 teaspoon salt",
      "1 tablespoon sugar",
      "1 1/4 cups milk",
      "1 egg",
      "3 tablespoons melted butter"
    ],
    instructions: "Mix dry ingredients. Add milk, egg, and butter. Stir until smooth. Pour batter onto griddle. Cook until golden brown and serve hot.",
    prepTime: 20,
    cuisine: "American",
    mealTags: ["Breakfast"],
    dietTags: ["Nut-free", "Soy-free"],
    difficulty: "Easy"
  },  
  {
    id: "quinoa-salad",
    title: "Quinoa Salad",
    description: "A refreshing and healthy salad with quinoa, black beans, corn, and bell pepper.",
    image: "https://www.tasteofhome.com/wp-content/uploads/2018/10/avocados-quinoa-salad.jpg?resize=1024",
    ingredients: [
      "1 cup quinoa",
      "2 cups water or vegetable broth",
      "1 can black beans, drained",
      "1 cup corn kernels",
      "1 red bell pepper, diced",
      "2 tablespoons lime juice",
      "Fresh cilantro"
    ],
    instructions: "Cook quinoa in water or broth. Let cool. Mix with beans, corn, and pepper. Toss with lime juice and cilantro. Season and serve.",
    prepTime: 30,
    cuisine: "Mexican",
    mealTags: ["Lunch"],
    dietTags: ["Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "beef-tacos",
    title: "Beef Tacos",
    description: "Classic ground beef tacos topped with cheese, lettuce, and tomato.",
    image: "https://th.bing.com/th/id/OIP.V60pc6LFIaBn0hO75jm1egHaHZ?w=203&h=202&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "500g ground beef",
      "1 packet taco seasoning",
      "8 small taco shells",
      "1 cup shredded lettuce",
      "1/2 cup shredded cheddar cheese",
      "1 tomato, diced",
      "Sour cream for serving"
    ],
    instructions: "Brown beef, add seasoning. Warm taco shells. Fill with beef, lettuce, cheese, tomato. Add sour cream if desired and serve.",
    prepTime: 25,
    cuisine: "Mexican",
    mealTags: ["Dinner"],
    dietTags: ["Nut-free", "Soy-free"],
    difficulty: "Easy"
  },
  {
    id: "baked-salmon",
    title: "Baked Salmon",
    description: "Simple and flavorful oven-baked salmon with lemon and herbs.",
    image: "https://th.bing.com/th/id/OIP.78_gi33jw5-6dBe1Xw4PPAHaE8?w=203&h=136&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "4 salmon fillets",
      "2 tablespoons olive oil",
      "2 tablespoons lemon juice",
      "2 cloves garlic, minced",
      "Salt and pepper",
      "Fresh dill (optional)"
    ],
    instructions: "Preheat oven to 400°F. Place salmon on tray. Drizzle with oil and lemon. Add garlic, salt, pepper. Bake 12–15 minutes. Garnish with dill.",
    prepTime: 20,
    cuisine: "American",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "chickpea-salad",
    title: "Chickpea Salad",
    description: "A protein-packed salad with chickpeas, cucumber, and lemon dressing.",
    image: "https://th.bing.com/th/id/OIP.6GI_G6dDCWMYVDL5JFLm-QHaHa?w=199&h=199&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 can chickpeas, drained and rinsed",
      "1 cucumber, diced",
      "1 tomato, diced",
      "1/4 red onion, diced",
      "2 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "Fresh parsley"
    ],
    instructions: "Combine chickpeas, cucumber, tomato, and onion. Add oil and lemon juice. Toss and garnish with parsley. Serve chilled or at room temp.",
    prepTime: 15,
    cuisine: "Mediterranean",
    mealTags: ["Lunch"],
    dietTags: ["Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "mushroom-risotto",
    title: "Mushroom Risotto",
    description: "Creamy risotto with sautéed mushrooms and parmesan.",
    image: "https://th.bing.com/th/id/OIP.tYiBu6u0HpaRyHBZ5nyVDAHaHa?w=191&h=191&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 1/2 cups Arborio rice",
      "4 cups chicken or vegetable broth",
      "1 cup mushrooms, sliced",
      "1 onion, diced",
      "2 tablespoons butter",
      "1/2 cup grated Parmesan cheese",
      "Salt and pepper"
    ],
    instructions: "Sauté onions and mushrooms in butter. Add rice. Gradually add broth while stirring until creamy. Mix in parmesan. Season and serve.",
    prepTime: 45,
    cuisine: "Italian",
    mealTags: ["Dinner"],
    dietTags: ["Vegetarian", "Nut-free", "Soy-free"],
    difficulty: "Difficult"
  },  
  {
    id: "eggplant-parmesan",
    title: "Eggplant Parmesan",
    description: "Baked layers of breaded eggplant, marinara, and melted cheeses.",
    image: "https://th.bing.com/th/id/OIP.NRHI7C67iHioWbS1B7TH-gHaHa?w=188&h=188&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "2 eggplants, sliced",
      "2 cups marinara sauce",
      "1 1/2 cups mozzarella cheese, shredded",
      "1/2 cup Parmesan cheese, grated",
      "1 cup breadcrumbs",
      "2 eggs, beaten",
      "Olive oil for frying"
    ],
    instructions: "Bread and fry eggplant. Layer with sauce and cheese in a dish. Repeat layers. Bake at 375°F for 25–30 minutes. Serve hot with basil.",
    prepTime: 50,
    cuisine: "Italian",
    mealTags: ["Dinner"],
    dietTags: ["Vegetarian", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "tuna-salad",
    title: "Tuna Salad",
    description: "A quick and healthy tuna salad with mayo, lemon, and celery.",
    image: "https://th.bing.com/th/id/OIP.I7OlOFQBMnXhh_ifIZTJxQHaHa?w=242&h=182&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 can tuna, drained",
      "2 tablespoons mayonnaise",
      "1 celery stalk, diced",
      "1 tablespoon lemon juice",
      "Salt and pepper",
      "Lettuce leaves for serving"
    ],
    instructions: "Mix tuna with mayo, celery, and lemon juice. Season to taste. Serve on lettuce or in sandwiches. Chill before serving.",
    prepTime: 10,
    cuisine: "American",
    mealTags: ["Lunch"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Easy"
  },
  {
    id: "fruit-smoothie",
    title: "Fruit Smoothie",
    description: "Refreshing smoothie made with banana, berries, and yogurt.",
    image: "https://th.bing.com/th/id/OIP.-Bg2aU_tNrirW1TsuL3URwHaHa?w=193&h=193&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 banana",
      "1 cup mixed berries (fresh or frozen)",
      "1/2 cup yogurt",
      "1/2 cup orange juice",
      "1 tablespoon honey (optional)"
    ],
    instructions: "Blend banana, berries, yogurt, and juice. Add honey if needed. Serve immediately in a glass. Optional: top with granola.",
    prepTime: 5,
    cuisine: "American",
    mealTags: ["Breakfast", "Snack"],
    dietTags: ["Vegetarian", "Gluten-free", "Nut-free", "Egg-free"],
    difficulty: "Easy"
  },  
  {
    id: "stuffed-bell-peppers",
    title: "Stuffed Bell Peppers",
    description: "Bell peppers filled with seasoned meat, rice, and tomato sauce, baked with cheese.",
    image: "https://th.bing.com/th/id/OIP.S-kTJL4AoWuN92AH1-bVcAHaHa?w=189&h=189&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "4 large bell peppers",
      "1 cup cooked rice",
      "1/2 pound ground beef or turkey",
      "1 cup tomato sauce",
      "1/2 cup shredded cheese",
      "1 onion, diced",
      "Salt and pepper"
    ],
    instructions: "Cook ground meat with onions. Mix with rice and tomato sauce. Stuff into peppers, top with cheese, and bake at 375°F for 25–30 minutes.",
    prepTime: 45,
    cuisine: "American",
    mealTags: ["Dinner"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Medium"
  },
  {
    id: "pumpkin-soup",
    title: "Pumpkin Soup",
    description: "Creamy and comforting soup made with fresh pumpkin and broth.",
    image: "https://th.bing.com/th/id/OIP.AE8wNsSu6KdqbFttDhk6cAHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 small pumpkin, peeled and diced",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "3 cups vegetable broth",
      "1/2 cup heavy cream",
      "2 tablespoons olive oil",
      "Salt and pepper"
    ],
    instructions: "Sauté onion and garlic in oil. Add pumpkin and broth. Simmer until soft. Blend smooth. Stir in cream and season. Serve hot.",
    prepTime: 40,
    cuisine: "American",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Gluten-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "beef-and-broccoli",
    title: "Beef and Broccoli",
    description: "A classic stir-fry dish with tender beef and crisp broccoli.",
    image: "https://th.bing.com/th/id/OIP.i6lVkr3Qcg5j0iCOY6iVCwHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "300g beef sirloin, thinly sliced",
      "2 cups broccoli florets",
      "2 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 tablespoon cornstarch",
      "2 tablespoons vegetable oil",
      "1 clove garlic, minced"
    ],
    instructions: "Coat beef with cornstarch. Sear in hot oil. Stir-fry garlic and broccoli, return beef, add sauces, and cook briefly. Serve over rice.",
    prepTime: 30,
    cuisine: "Chinese",
    mealTags: ["Dinner"],
    dietTags: ["Nut-free", "Egg-free"],
    difficulty: "Medium"
  },
  {
    id: "bbq-chicken",
    title: "BBQ Chicken",
    description: "Juicy grilled chicken thighs coated in barbecue sauce.",
    image: "https://th.bing.com/th/id/OIP.CcHT2Un2S6wSrl2zyVG_qgHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "4 chicken thighs",
      "1/2 cup barbecue sauce",
      "1 tablespoon olive oil",
      "1 teaspoon paprika",
      "Salt and pepper"
    ],
    instructions: "Season chicken with oil, paprika, salt, and pepper. Grill both sides. Brush with BBQ sauce in final minutes. Serve with extra sauce.",
    prepTime: 30,
    cuisine: "American",
    mealTags: ["Dinner"],
    dietTags: ["Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "carrot-cake",
    title: "Carrot Cake",
    description: "Moist spiced cake with grated carrots and optional frosting.",
    image: "https://th.bing.com/th/id/OIP.cw1rsBJTDjcb-VcxF5jDPgHaHa?w=183&h=182&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "2 cups grated carrots",
      "1 1/2 cups all-purpose flour",
      "1 cup sugar",
      "1/2 cup vegetable oil",
      "2 eggs",
      "1 teaspoon baking powder",
      "1 teaspoon cinnamon"
    ],
    instructions: "Mix dry and wet ingredients separately. Combine. Pour into greased pan. Bake at 350°F for 30–35 minutes. Cool before frosting.",
    prepTime: 50,
    cuisine: "American",
    mealTags: ["Dessert"],
    dietTags: ["Vegetarian", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },  
  {
    id: "falafel-wrap",
    title: "Falafel Wrap",
    description: "A quick and satisfying wrap filled with falafel, fresh veggies, and creamy tahini.",
    image: "https://th.bing.com/th/id/OIP.zJAfIWK81KvyXEspdvWJbgHaE8?w=286&h=191&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "6 falafel balls",
      "2 pita breads or wraps",
      "1/2 cup hummus",
      "1/2 cucumber, sliced",
      "1 tomato, sliced",
      "Lettuce leaves",
      "Tahini sauce for drizzling"
    ],
    instructions: "Warm wraps, spread with hummus, layer with falafel, veggies, tahini. Roll and serve.",
    prepTime: 20,
    cuisine: "Middle Eastern",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Vegan", "Nut-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "coconut-curry",
    title: "Coconut Curry",
    description: "A creamy coconut-based curry with aromatic spices and tender vegetables.",
    image: "https://th.bing.com/th/id/OIP.UkzqTbZWBfbjLTGwUDyeZgHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 tablespoon vegetable oil",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 can coconut milk",
      "2 tablespoons curry powder",
      "1 cup mixed vegetables",
      "Salt and pepper"
    ],
    instructions: "Sauté onion and garlic, add curry powder, coconut milk, and veggies. Simmer until tender.",
    prepTime: 30,
    cuisine: "Indian",
    mealTags: ["Dinner"],
    dietTags: ["Vegetarian", "Vegan", "Gluten-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "chicken-caesar-salad",
    title: "Chicken Caesar Salad",
    description: "A classic Caesar salad topped with grilled chicken, croutons, and Parmesan.",
    image: "https://th.bing.com/th/id/OIP.br23HPH5DGj20W3bUdG1LAHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "2 grilled chicken breasts, sliced",
      "1 head romaine lettuce, chopped",
      "1/2 cup croutons",
      "1/4 cup grated Parmesan cheese",
      "Caesar dressing"
    ],
    instructions: "Toss lettuce in dressing. Top with chicken, croutons, and Parmesan. Serve chilled.",
    prepTime: 15,
    cuisine: "American",
    mealTags: ["Lunch"],
    dietTags: ["Nut-free", "Soy-free"],
    difficulty: "Easy"
  },
  {
    id: "chocolate-mousse",
    title: "Chocolate Mousse",
    description: "Light and fluffy chocolate mousse with whipped cream and eggs.",
    image: "https://veenaazmanov.com/wp-content/uploads/2021/01/Easy-Chocolate-Mousse-Recipe-with-Eggs9.jpg",
    ingredients: [
      "200g dark chocolate",
      "3 eggs, separated",
      "1/4 cup sugar",
      "1/2 cup heavy cream"
    ],
    instructions: "Melt chocolate. Fold in yolks, whipped egg whites, and cream. Chill before serving.",
    prepTime: 180,
    cuisine: "French",
    mealTags: ["Dessert"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "mango-smoothie-bowl",
    title: "Mango Smoothie Bowl",
    description: "A tropical smoothie bowl made with mango and banana, topped with your favorites.",
    image: "https://th.bing.com/th/id/OIP.ejzzu0jJfks4f3s0PY-ryAHaHa?w=203&h=203&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 ripe mango, peeled and diced",
      "1/2 banana",
      "1/2 cup yogurt",
      "1/4 cup orange juice",
      "Toppings: granola, berries, coconut flakes"
    ],
    instructions: "Blend mango, banana, yogurt, and juice. Pour into bowl, add toppings, and serve.",
    prepTime: 10,
    cuisine: "Tropical",
    mealTags: ["Breakfast"],
    dietTags: ["Vegetarian", "Gluten-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  
  {
    id: "stuffed-zucchini",
    title: "Stuffed Zucchini",
    description: "Zucchini boats filled with savory beef and marinara, baked to perfection.",
    image: "https://th.bing.com/th/id/OIP.WyQWsCcdPeQPPtzOMRBffgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "4 zucchini, halved lengthwise",
      "1/2 pound ground beef",
      "1/2 cup marinara sauce",
      "1/4 cup Parmesan cheese",
      "Salt and pepper"
    ],
    instructions: "Scoop zucchini, fill with cooked beef and marinara, top with cheese, and bake.",
    prepTime: 35,
    cuisine: "Mediterranean",
    mealTags: ["Dinner"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "chili-con-carne",
    title: "Chili Con Carne",
    description: "A hearty chili made with beef, beans, and a bold blend of spices.",
    image: "https://th.bing.com/th/id/OIP.ZkA8kULYI25X8ANj0Yym4wHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 pound ground beef",
      "1 can kidney beans, drained",
      "1 can diced tomatoes",
      "1 onion, diced",
      "2 tablespoons chili powder",
      "Salt and pepper"
    ],
    instructions: "Brown beef and onion, add remaining ingredients, simmer, and serve hot.",
    prepTime: 40,
    cuisine: "Tex-Mex",
    mealTags: ["Dinner"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "jambalaya",
    title: "Jambalaya",
    description: "A spicy Creole rice dish with sausage, shrimp, and bell peppers.",
    image: "https://th.bing.com/th/id/OIP.FB59qcumDGbUYb8QLe0EoAHaHa?w=189&h=190&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 cup long-grain rice",
      "1/2 pound sausage, sliced",
      "1/2 pound shrimp, peeled",
      "1 green bell pepper, diced",
      "1 onion, diced",
      "2 cups chicken broth",
      "1 teaspoon Cajun seasoning"
    ],
    instructions: "Cook sausage and onion, add rice and broth, simmer, stir in shrimp, serve.",
    prepTime: 45,
    cuisine: "Cajun",
    mealTags: ["Dinner"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Difficult"
  },
  {
    id: "pesto-pasta",
    title: "Pesto Pasta",
    description: "Pasta tossed in creamy basil pesto and topped with cheese and tomatoes.",
    image: "https://th.bing.com/th/id/OIP.H575yk6XbDYWg_4wM3O6eAHaHa?w=188&h=188&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "300g pasta",
      "1/2 cup pesto sauce",
      "1/4 cup Parmesan cheese",
      "Cherry tomatoes (optional)",
      "Salt and pepper"
    ],
    instructions: "Boil pasta, toss with pesto and cheese, season, and serve warm.",
    prepTime: 20,
    cuisine: "Italian",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Nut-free"],
    difficulty: "Easy"
  },
  {
    id: "vegetable-frittata",
    title: "Vegetable Frittata",
    description: "A fluffy egg dish baked with vegetables and cheese, perfect for brunch.",
    image: "https://cdn.scrambledchefs.com/wp-content/uploads/2021/01/Vegetable-Frittata-Featured.jpg",
    ingredients: [
      "6 eggs",
      "1/2 cup milk",
      "1 cup spinach",
      "1/2 cup mushrooms, sliced",
      "1/4 cup cheddar cheese",
      "Salt and pepper"
    ],
    instructions: "Whisk ingredients, bake in ovenproof skillet until set, slice and serve.",
    prepTime: 30,
    cuisine: "American",
    mealTags: ["Breakfast", "Brunch"],
    dietTags: ["Gluten-free", "Soy-free", "Nut-free"],
    difficulty: "Medium"
  },
  
  {
    id: "baked-potatoes",
    title: "Baked Potatoes",
    description: "Classic oven-baked russet potatoes topped with sour cream and chives.",
    image: "https://th.bing.com/th/id/OIP.u-u7HOHsEeieJJBSTNZlnQHaHa?w=260&h=195&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "4 large russet potatoes",
      "Olive oil",
      "Salt",
      "Butter",
      "Sour cream",
      "Chives"
    ],
    instructions: "Bake seasoned potatoes until tender, then top with butter, sour cream, and chives.",
    prepTime: 60,
    cuisine: "American",
    mealTags: ["Dinner", "Lunch"],
    dietTags: ["Vegetarian", "Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Easy"
  },
  {
    id: "ratatouille",
    title: "Ratatouille",
    description: "A French dish made with sautéed eggplant, zucchini, and bell peppers in olive oil.",
    image: "https://th.bing.com/th/id/OIP.yMmKLVqQ_X90A_yc_0VT4QHaHa?w=251&h=188&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 eggplant, diced",
      "1 zucchini, diced",
      "1 red bell pepper, diced",
      "2 tomatoes, diced",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Fresh basil"
    ],
    instructions: "Sauté garlic and vegetables, add tomatoes and herbs, cook until tender.",
    prepTime: 40,
    cuisine: "French",
    mealTags: ["Dinner", "Lunch"],
    dietTags: ["Vegan", "Vegetarian", "Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "banana-bread",
    title: "Banana Bread",
    description: "A moist and sweet quick bread made with ripe bananas and simple ingredients.",
    image: "https://th.bing.com/th/id/OIP.-CisqNwZJyYXoADpGZk5qQHaHa?w=260&h=195&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "3 ripe bananas, mashed",
      "1 1/2 cups all-purpose flour",
      "1/2 cup sugar",
      "1/3 cup melted butter",
      "1 teaspoon baking soda",
      "1 egg"
    ],
    instructions: "Mix ingredients, pour into loaf pan, and bake until golden and set.",
    prepTime: 60,
    cuisine: "American",
    mealTags: ["Breakfast", "Snack", "Dessert"],
    dietTags: ["Vegetarian", "Nut-free"],
    difficulty: "Easy"
  },
  {
    id: "grilled-cheese-sandwich",
    title: "Grilled Cheese Sandwich",
    description: "A golden, crispy sandwich with melty cheddar cheese and buttery bread.",
    image: "https://th.bing.com/th/id/OIP.oNY7aIa-g4EgQ947cHAwcgHaHa?w=257&h=193&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "2 slices bread",
      "2 slices cheddar cheese",
      "1 tablespoon butter"
    ],
    instructions: "Assemble and grill the sandwich in a skillet until golden and crisp.",
    prepTime: 10,
    cuisine: "American",
    mealTags: ["Lunch", "Snack"],
    dietTags: ["Vegetarian", "Nut-free"],
    difficulty: "Easy"
  },
  {
    id: "biryani",
    title: "Biryani",
    description: "A fragrant Indian rice dish layered with spiced meat and aromatic herbs.",
    image: "https://th.bing.com/th/id/OIP.Lr8zKZyxES-e-yHVfVNc0gHaHa?w=235&h=180&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 cup basmati rice",
      "1/2 pound chicken or lamb",
      "1 onion, sliced",
      "2 tablespoons biryani spice mix",
      "1/2 cup yogurt",
      "2 cups water"
    ],
    instructions: "Cook meat and spices, then layer with rice and simmer until fragrant and tender.",
    prepTime: 50,
    cuisine: "Indian",
    mealTags: ["Dinner"],
    dietTags: ["Gluten-free", "Nut-free", "Soy-free"],
    difficulty: "Difficult"
  },
  
  {
    id: "lasagna",
    title: "Lasagna",
    description: "Classic baked pasta layered with meat sauce, ricotta, and melted cheese.",
    image: "https://th.bing.com/th/id/OIP.X3RWMPR1pU13xmnDWenLAAHaHa?w=194&h=195&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "9 lasagna noodles",
      "1/2 pound ground beef",
      "2 cups marinara sauce",
      "2 cups ricotta cheese",
      "2 cups shredded mozzarella",
      "1/2 cup grated Parmesan cheese"
    ],
    instructions: "Layer cooked noodles with meat sauce, ricotta, and cheese, then bake until golden.",
    prepTime: 60,
    cuisine: "Italian",
    mealTags: ["Dinner"],
    dietTags: ["Nut-free"],
    difficulty: "Medium"
  },
  {
    id: "tom-yum-soup",
    title: "Tom Yum Soup",
    description: "A spicy Thai soup with shrimp, lemongrass, lime, and herbs.",
    image: "https://th.bing.com/th/id/OIP.YFHKS0nW-Ex5M1R2pJGzUQHaHa?w=196&h=197&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "2 cups chicken broth",
      "6 shrimp, peeled and deveined",
      "2 stalks lemongrass, chopped",
      "2 kaffir lime leaves",
      "1 tablespoon fish sauce",
      "1 tablespoon lime juice",
      "Chili peppers (optional)"
    ],
    instructions: "Simmer broth with herbs, then add shrimp and seasonings; serve hot.",
    prepTime: 25,
    cuisine: "Thai",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Medium"
  },
  {
    id: "chai-latte",
    title: "Chai Latte",
    description: "A warm and spiced milk tea infused with cinnamon, cardamom, and ginger.",
    image: "https://th.bing.com/th/id/OIP.a2VsozCGCjVuakwyyVjFtwHaHa?w=267&h=200&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "1 cup milk",
      "1/2 cup water",
      "1 black tea bag",
      "1 cinnamon stick",
      "2 cardamom pods",
      "1 tablespoon sugar",
      "1/2 teaspoon ground ginger"
    ],
    instructions: "Simmer spices and tea in milk and water; sweeten and strain before serving.",
    prepTime: 10,
    cuisine: "Indian",
    mealTags: ["Breakfast", "Snack"],
    dietTags: ["Vegetarian", "Gluten-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "olive-tapenade",
    title: "Olive Tapenade",
    description: "A savory Mediterranean spread made from olives, capers, garlic, and lemon.",
    image: "https://theschmidtywife.com/wp-content/uploads/2022/12/Secondary_Olive_Tapenade-720x720.jpg",
    ingredients: [
      "1 cup black olives",
      "2 tablespoons capers",
      "2 cloves garlic",
      "2 tablespoons olive oil",
      "1 teaspoon lemon juice"
    ],
    instructions: "Blend all ingredients into a coarse paste; serve with bread or crackers.",
    prepTime: 10,
    cuisine: "Mediterranean",
    mealTags: ["Snack", "Appetizer"],
    dietTags: ["Vegan", "Vegetarian", "Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  {
    id: "pork-chops",
    title: "Pork Chops",
    description: "Grilled or pan-seared pork chops seasoned with garlic and paprika.",
    image: "https://th.bing.com/th/id/OIP.PxMO6PHUmPmMK7yvcraPTgHaHa?w=250&h=188&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "4 pork chops",
      "2 tablespoons olive oil",
      "1 teaspoon garlic powder",
      "1 teaspoon paprika",
      "Salt and pepper"
    ],
    instructions: "Season pork and cook over medium-high heat until juices run clear.",
    prepTime: 20,
    cuisine: "American",
    mealTags: ["Dinner", "Lunch"],
    dietTags: ["Gluten-free", "Lactose-free", "Nut-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  },
  
  {
    id: "apple-pie",
    title: "Apple Pie",
    description: "Classic American dessert with sweet spiced apples in a flaky crust.",
    image: "https://th.bing.com/th/id/OIP.4ofHUktXwiBEARLdXSkjmgHaHa?w=260&h=195&c=7&r=0&o=5&pid=1.7",
    ingredients: [
      "6 cups sliced apples",
      "3/4 cup sugar",
      "1 teaspoon cinnamon",
      "2 tablespoons flour",
      "Pie crust for top and bottom"
    ],
    instructions: "Mix apples with sugar and cinnamon, fill crust, and bake until golden brown.",
    prepTime: 60,
    cuisine: "American",
    mealTags: ["Dessert"],
    dietTags: ["Vegetarian", "Nut-free", "Soy-free"],
    difficulty: "Medium"
  },
  {
    id: "falafel-wrap",
    title: "Falafel Wrap",
    description: "Middle Eastern wrap with crispy falafel, veggies, hummus, and tahini.",
    image: "https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2017/06/vegan-gyros-one-800x1200.jpg",
    ingredients: [
      "6 falafel balls",
      "2 pita breads or wraps",
      "1/2 cup hummus",
      "1/2 cucumber, sliced",
      "1 tomato, sliced",
      "Lettuce leaves",
      "Tahini sauce"
    ],
    instructions: "Layer hummus, falafel, and vegetables in warm pita, drizzle with tahini, and wrap.",
    prepTime: 20,
    cuisine: "Middle Eastern",
    mealTags: ["Lunch", "Dinner"],
    dietTags: ["Vegetarian", "Lactose-free", "Soy-free", "Egg-free"],
    difficulty: "Easy"
  }
];

const RecipePage = ({ favorites, toggleFavorite }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({});
  const [reviews, setReviews] = useState({});

  useEffect(() => {
      const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      const combinedRecipes = [...storedRecipes, ...allRecipes];
      setRecipes(combinedRecipes);
      setFilteredRecipes(combinedRecipes); // Initialize with all recipes
  }, []); 

  const applyFilters = (filterName, value) => {
      const newFilters = { ...filters, [filterName]: value };
      setFilters(newFilters);

      const filtered = recipes.filter((recipe) => {
          return Object.keys(newFilters).every((key) => {
              if (!newFilters[key]) return true; 
              return recipe[key] === true; 
          });
      });

      setFilteredRecipes(filtered);
  };

  const handleReviewSubmit = (recipeId, reviewData) => {
    setReviews((prev) => ({
      ...prev,
      [recipeId]: [...(prev[recipeId] || []), reviewData],
    }));
  };

  return (
      <div className="recipe-page-container">
          <h1>Recipe Page</h1>

          <div className="filter-buttons">
              <FilterRecipes 
                  allRecipes={recipes} 
                  setFilteredRecipes={setFilteredRecipes} 
                  applyFilters={applyFilters} 
              />
          </div>

          <div className="recipe-list">
              {filteredRecipes.length === 0 ? (
                  <p>No recipes found</p>
              ) : (
                  filteredRecipes.map((recipe) => (
                      <div key={recipe.id} className="recipe-card">
                          <h2>{recipe.title}</h2>
                          <p>{recipe.description}</p>
                          {recipe.image && (
                              <div className="image-container">
                                  <img
                                      src={recipe.image}
                                      alt={`${recipe.title} preview`}
                                      style={{ width: '200px', marginTop: '10px' }}
                                  />
                              </div>
                          )}
                          <div className="ingredients">
                              <strong>Ingredients:</strong>
                              <ul>
                                  {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                                      <li key={idx}>{ingredient}</li>
                                  ))}
                              </ul>
                          </div>

                          <div className="instructions">
                              <strong>Instructions:</strong>
                              <p>{recipe.instructions}</p>
                          </div>

                          {recipe.difficulty && (
                              <div className="difficulty">
                                  <strong>Difficulty:</strong> {recipe.difficulty}
                              </div>
                          )}

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

                          <RecipeReview onSubmit={(reviewData) => handleReviewSubmit(recipe.id, reviewData)} />


                          <button onClick={() => toggleFavorite(recipe)}>
                              {favorites.some(fav => fav.id === recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                          </button>
                      </div>
                  ))
              )}
          </div>
      </div>
  );
};

export default RecipePage;
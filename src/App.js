import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipePage from "./components/RecipePage";
import FilterRecipes from "./components/FilterRecipes";
import RecipeForm from "./components/RecipeForm"; // <-- make sure this is imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} /> {/* ✅ fixed */}
        <Route path="/form" element={<RecipeForm />} />    {/* ✅ added */}
        <Route path="/filter" element={<FilterRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipePage from "./components/RecipePage";
import FilterRecipes from "./components/FilterRecipes";
// import other components if needed

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/filter" element={<FilterRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

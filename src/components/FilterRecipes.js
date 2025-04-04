import React, { useState, useRef, useEffect } from 'react';
import './FilterRecipes.css';

const FilterRecipes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
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
  const [cookingTime, setCookingTime] = useState(0);
  const sidebarRef = useRef(null);
  const filterDropdownRef = useRef(null);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
      setIsFilterDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  return (
    <div className="filter-recipes">
      <div className="search-container">
        <div className="search-bar" style={{ position: 'relative' }}>
          <input type="text" placeholder="Search recipes..." />
          <button 
            className="filter-button" 
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            Filters
          </button>
          {isFilterDropdownOpen && (
            <div className="dropdown" ref={filterDropdownRef}>
              <label><input type="checkbox" name="vegetarian" checked={filters.vegetarian} onChange={handleFilterChange} /> Vegetarian</label>
              <label><input type="checkbox" name="vegan" checked={filters.vegan} onChange={handleFilterChange} /> Vegan</label>
              <label><input type="checkbox" name="lowCarb" checked={filters.lowCarb} onChange={handleFilterChange} /> Low-carb</label>
              <label><input type="checkbox" name="glutenFree" checked={filters.glutenFree} onChange={handleFilterChange} /> Gluten-free</label>
              <label><input type="checkbox" name="lactoseFree" checked={filters.lactoseFree} onChange={handleFilterChange} /> Lactose-free</label>
              <label><input type="checkbox" name="nutFree" checked={filters.nutFree} onChange={handleFilterChange} /> Nut-free</label>
              <label><input type="checkbox" name="soyFree" checked={filters.soyFree} onChange={handleFilterChange} /> Soy-free</label>
              <label><input type="checkbox" name="eggFree" checked={filters.eggFree} onChange={handleFilterChange} /> Egg-free</label>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} ref={sidebarRef}>
        <h3>Cooking time: <span>{cookingTime} min</span></h3>
        <input 
          type="range" 
          min="0" 
          max="120" 
          value={cookingTime} 
          onChange={(e) => setCookingTime(e.target.value)} 
          className="cooking-time-slider"
        />
        <h3>Difficulty:</h3>
        <div>
          <label><input type="radio" name="difficulty" /> Easy</label>
        </div>
        <div>
          <label><input type="radio" name="difficulty" /> Medium</label>
        </div>
        <div>
          <label><input type="radio" name="difficulty" /> Hard</label>
        </div>
        <h3>Meal Type:</h3>
        <div>
          <label><input type="checkbox" /> Breakfast</label>
        </div>
        <div>
          <label><input type="checkbox" /> Lunch</label>
        </div>
        <div>
          <label><input type="checkbox" /> Dinner</label>
        </div>
        <div>
          <label><input type="checkbox" /> Snack</label>
        </div>
        <div>
          <label><input type="checkbox" /> Dessert</label>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && <div className="overlay" onClick={handleClickOutside}></div>}

      {/* Sidebar Button */}
      <button 
        className={`sidebar-button ${isSidebarOpen ? "open" : ""}`} 
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
          setIsFilterDropdownOpen(false); // Close filter dropdown when sidebar is opened
        }}
      >
        ☰
      </button>
    </div>
  );
};

export default FilterRecipes;
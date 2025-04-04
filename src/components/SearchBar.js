import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    setSearchTerm(e.target.value); // Pass search term to parent component
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={inputValue} // Controlled input
          onChange={handleSearchChange} // Update input value
        />
      </div>
    </div>
  );
};

export default SearchBar;

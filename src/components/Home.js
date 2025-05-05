import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Recipe App</h1>
      <p>This is a temporary home page</p>
      <p>For now we have some links to open different parts of the app.</p>

      <ul>
        <li><Link to="/recipe">Recipe Page</Link></li>
        <li><Link to="/form">Add New Recipe</Link></li>
      </ul>
    </div>
  );
};

export default Home;

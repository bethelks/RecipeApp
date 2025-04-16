// This is just to navigate between our pages temporarily
import React from "react";
import { Link } from "react-router-dom";
import './App.css';


function TempNavigate() {
    console.log("TempNavigate rendered");
    return (
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/recipe">Recipe Page</Link>
            <Link to="/form">Recipe Form</Link>
            <Link to ="/favorite">Favorites</Link>
        </nav>
    );
}

export default TempNavigate;
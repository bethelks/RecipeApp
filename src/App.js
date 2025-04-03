import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import LoginScreen from "./LoginScreen"; // Ensure the import path is correct
import ForgotPasswordScreen from "./ForgotPasswordScreen"; // Import the ForgotPasswordScreen component

function App() {
  return (
    <Router>
      <div>
        <header>
          {/* Displaying the SSL certificate image */}
          <img
            src={`${process.env.PUBLIC_URL}/ssl_certificate.png`}
            alt="SSL Certificate"
            className="ssl-image"
          />
        </header>

        {/* Define routes */}
        <Routes>
          {/* Route for LoginScreen */}
          <Route path="/" element={<LoginScreen />} />
          {/* Route for ForgotPasswordScreen */}
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

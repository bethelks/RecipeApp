import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios'; // Import axios for HTTP requests
import "./LoginScreen.css"; // Import your CSS for styling
import logo from './assets/images/company-logo.png';
import sslLogo from './assets/images/ssl_certificate.png'

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRegisterVisible, setIsRegisterVisible] = useState(false); // State for toggling registration section
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Create a navigate function

  const handleLogin = async () => {
    setErrorMessage(""); // Reset error message before the login attempt
    try {
      const response = await axios.post("https://api.bethelprojects.site:1443/api/User/login", {
        Email: email,
        Password: password,
      });
      console.log("Login successful:", response.data);
      
      // After successful login, navigate to the /recipe page
      navigate('/recipe'); 
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // If response was received from the server
        if (error.response.status === 401) {
          setErrorMessage("Invalid username or password. Please try again."); // Unauthorized
        } else {
          setErrorMessage("An error occurred. Please try again."); // Other errors
        }
      } else {
        setErrorMessage("Network error. Please check your connection."); // Network error
      }
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://api.bethelprojects.site:1443/api/User/register", {
        users_FirstName: firstName,
        users_LastName: lastName,
        users_PhoneNbr: phoneNumber,
        users_Email: email,
        users_Password: password,
        verificationCode: verificationCode,
        isVerified: false,
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error);
    }
  };

  const toggleRegisterVisibility = () => {
    setIsRegisterVisible(!isRegisterVisible); // Toggle the registration section
    console.log("Toggled visibility:", !isRegisterVisible);
};

  return (
    <div className="login-container">
      <img src={logo} alt="Company Logo" className="logo" />
      <div className="card">
        <h2 className="title">Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>

      {/* Create Account Section */}
      <div className="card">
        <h2 className="title" onClick={toggleRegisterVisibility} style={{ cursor: 'pointer' }}>
          {isRegisterVisible ? "Hide Create Account" : "Create Account"}
        </h2>
        {isRegisterVisible && (
    <div>
        <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
                id="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
        </div>
        <div className="input-group">
            <label htmlFor="regEmail">Email</label>
            <input
                id="regEmail"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="input-group">
            <label htmlFor="regPassword">Password</label>
            <input
                id="regPassword"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="input-group">
            <label htmlFor="verificationCode">Verification Code</label>
            <input
                id="verificationCode"
                type="text"
                placeholder="Enter the verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
        </div>
        <button onClick={handleRegister}>Create Account</button>
    </div>
)}
      </div>

      <div className="privacy-section">
        <p>By logging in, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
        <p><img src={sslLogo} alt="SSL Certificate" className="ssl-logo" /></p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import "./LoginScreen.css"; // Import your CSS for styling

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with", email, password);
  };

  return (
    <div className="login-container">
      <img src="/company-logo.png" alt="Company Logo" className="logo" />
      <div className="card">
        <h2 className="title">Login</h2>
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
          {/* Use Link component for navigation */}
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      <div className="privacy-section">
        <p>By logging in, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
        <p>SSL Secured <img src="/ssl_certificate.png" alt="SSL Certificate" className="ssl-logo" /></p>
      </div>
    </div>
  );
}

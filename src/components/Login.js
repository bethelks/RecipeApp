import React from "react";
import "./Login.css"; // Optional: Add styling

const Login = () => {
  return (
    <div className="login-container">
      <img src="/logo.png" alt="Company Logo" className="logo" />

      <form className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit">Login</button>
      </form>

      <p className="privacy-statement">
        By logging in, you agree to our <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <div className="ssl-certificate">
        <img src="/ssl-certificate.png" alt="SSL Secure" />
      </div>
    </div>
  );
};

export default Login;



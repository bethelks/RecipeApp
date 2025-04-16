import React, { useState } from "react";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    // Simulate sending reset email
    if (email) {
      setMessage(`A password reset link has been sent to ${email}.`);
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Please enter your email address to reset your password.</p>

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

      <button className="reset-button" onClick={handleResetPassword}>
        Reset Password
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ForgotPasswordScreen;
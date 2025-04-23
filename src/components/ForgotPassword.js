import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <Link to="/">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;

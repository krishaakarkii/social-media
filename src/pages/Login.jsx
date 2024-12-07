import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      login(token, user); // Pass user data to context
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className={styles.loginContainer}>
  <h2>Login</h2>
  <form onSubmit={handleLogin} className={styles.loginForm}>
    <div>
      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit">Login</button>
  </form>
</div>
  );
};

export default Login;
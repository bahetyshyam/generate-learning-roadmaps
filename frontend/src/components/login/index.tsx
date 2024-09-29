import React, { useState, useContext } from "react";
import styles from "./styles.module.css";
import { AppContext } from "../../contexts/AppContext.tsx";

const LoginPage: React.FC = () => {
  const context = useContext(AppContext);

  // Handle undefined context
  if (!context) {
    throw new Error("LoginPage must be used within an AppProvider");
  }

  const { login } = context;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // You would typically validate the username and password here
    login(username, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Login or Sign Up</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input} // Apply CSS module styles
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input} // Apply CSS module styles
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

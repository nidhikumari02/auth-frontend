import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/style.module.css";
import { baseUrl, loginUrl } from "../constant";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!formData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    }
    if (!formData.password) {
      formIsValid = false;
      errors.password = "Password is required";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleRedirectRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const url = `${baseUrl}${loginUrl}`;
    try {
      const response = await axios.post(
        url,
        formData
      );
      localStorage.setItem("token", response.data.authtoken);
      navigate("/profile");
    } catch (error) {
      alert("error: " + error.response.data.message);
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <p>
            Don't have account?{" "}
            <a className={styles.loginhere} onClick={handleRedirectRegister}>
              Sign Up
            </a>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

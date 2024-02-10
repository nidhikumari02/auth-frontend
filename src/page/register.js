import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/style.module.css";
import { baseUrl, registerUrl } from "../constant";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    contact: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!formData.name) {
      formIsValid = false;
      errors.name = "Name is required";
    }
    if (!formData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    }
    if (!formData.password) {
      formIsValid = false;
      errors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Confirm Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Password and Confirm Password must be same";
    }
    if (!formData.dateOfBirth) {
      formIsValid = false;
      errors.dateOfBirth = "Date of Birth is required";
    }
    if (!formData.contact) {
      formIsValid = false;
      errors.contact = "Contact is required";
    }
    if (!formData.address) {
      formIsValid = false;
      errors.address = "Address is required";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const url = `${baseUrl}${registerUrl}`;
    const body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      date_of_birth: formData.dateOfBirth,
      contact: formData.contact,
      address: formData.address,
    };
    try {
      const response = await axios.post(
        url,
        body
      );
      localStorage.setItem("token", response.data.authtoken);
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h2>Register</h2>
        <form onSubmit={()=>handleSubmit()}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
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
          <div className={styles.formGroup}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && (
              <span className={styles.error}>{errors.dateOfBirth}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </div>
          <p>
            Already have an account?{" "}
            <a className={styles.loginhere} onClick={()=>handleRedirectLogin()}>
              Login here
            </a>
          </p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

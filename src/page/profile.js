import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/style.module.css";
import { baseUrl, profileUrl } from "../constant";
const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    alert("You will be logged out");
     window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const url = `${baseUrl}${profileUrl}`;
    const body = {
      name: formData.name,
      date_of_birth: formData.dateOfBirth,
      contact: formData.contact,
      address: formData.address,
    };
    try {
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormData({
        name: response.data.updatedUser.name,
        dateOfBirth: response.data.updatedUser.date_of_birth,
        contact: response.data.updatedUser.contact,
        address: response.data.updatedUser.address,
      });
      alert("Profile updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      alert("An error occurred while updating profile");
    }
  };

  const getProfile = async () => {
    const url = `${baseUrl}${profileUrl}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormData({
        name: response.data.name,
        dateOfBirth: response.data.date_of_birth,
        contact: response.data.contact,
        address: response.data.address,
      });
    } catch (error) {
      console.error("Profile fetching failed:", error.response.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h2>Profile Update</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              defaultValue={formData.name}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
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
          
          <button type="submit">Update</button>
        
            <button className={styles.logouthere} onClick={() => handleLogOut()}>
              Logout
            </button>
        </form>
        
      </div>
      
    </div>
  );
};

export default Profile;

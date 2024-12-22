import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "./auth";

export default function LoginForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData((userEnterData) => ({
      ...userEnterData,
      [event.target.name]: event.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: `Please enter your ${event.target.name}`,
      }));
    }
  };

  const authenticateUser = async () => {
    try {
      // Reference to the Firestore collection
      const usersCollectionRef = collection(db, "users");

      // Query to find the user with the given username
      const q = query(usersCollectionRef, where("userName", "==", formData.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        
        // Check if the password matches
        if (userDoc.password === formData.password) {
          setStatus("Login successful!");
          setIsLoggedIn(true); 
          navigate("/dashboard"); // Navigate to dashboard
        } else {
          setStatus("Invalid password");
        }
      } else {
        setStatus("User not found");
      }
    } catch (error) {
      setStatus("Login failed. Please check your credentials.");
      console.error("Error logging in: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
      if (!formData.username) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Please enter your username",
        }));
      }
      if (!formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Please enter your password",
        }));
      }
      return;
    }
    await authenticateUser ();
    setFormData({ username: "", password: "" });
  };

  const viewPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            id="username"
            onChange={handleInputChange}
            name="username"
            onBlur={handleBlur}
          />
          {errors.username && <div className="error">{errors.username}</div>}

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={formData.password}
              id="password"
              onChange={handleInputChange}
              name="password"
              onBlur={handleBlur}
            />
            <i
              className={`fa-regular ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={viewPassword}
            ></i>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          {status && (
            <div className={`status ${status.includes("failed") ? "error" : "success"}`}>
              <p>{status}</p>
            </div>
          )}
          <button type="submit" disabled={!formData.username || !formData.password}>
            Login
          </button>
        </form>
      </div>
      <h4 className="signup-prompt">
        If you are a new user?{" "}
        <NavLink to="/signup" className="signup-link">
          Signup now
        </NavLink>
      </h4>
    </>
  );
}

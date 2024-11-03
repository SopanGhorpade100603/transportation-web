import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [responseData, setResponseData] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData((userEnterData) => {
      return { ...userEnterData, [event.target.name]: event.target.value };
    });
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const handleBlur = (event) => {
    // Check if the input field is empty
    if (!event.target.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: `Please enter your ${event.target.name}`, // Set an appropriate error message
      }));
    }
  };

  const sendDataToBackend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();
      console.log("data is *** ", data);

      // Check if login is successful or not
      if (data.statusCode === 200) {
        setStatus("Login successful!");
        setIsLoggedIn(true); // to render navbar after login
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard", { replace: true });
      } else {
        setStatus("Invalid username or password.");
      }
    } catch (error) {
      setStatus("Error: Could not connect to server");
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
      return; // Prevent form submission if there are errors
    }
    sendDataToBackend();
  };

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

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
              type={showPassword ? "text" : "password"} // Toggle between password and text
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
            <div className="status">
              <p>{status}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={!formData.username || !formData.password}
          >
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

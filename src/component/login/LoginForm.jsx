import React from "react";
import { useState } from "react";

export default function Loginform() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
      // Check if any field is empty before submission
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
    console.log(formData);
    alert("form was submitted successfull");
    setFormData({ username: "", password: "" });
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
          <button
            type="submit"
            disabled={!formData.username || !formData.password}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

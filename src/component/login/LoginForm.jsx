import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [responseData, setResponseData] = useState(null); // to  send data as backend
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

  const sendDataToFlask = async () => {
    // to send data backend
    const data = { formData };
    const response = await fetch("http://127.0.0.1:5000/api/data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setFormData({ username: "", password: "" });
  };

  const handleSubmit = async (event) => {
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
    // console.log(formData);
    setFormData({ username: "", password: "", status: "" });
    sendDataToFlask();

    try {
      // Making a POST request to the Flask backend
      const response = await fetch("http://127.0.0.1:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }), // Send formData in the request body
      });
      const data = await response.json();
      console.log("data is *** ", data);

      // Check if login is successful or not
      if (data.statusCode === 200) {
        setStatus("Login successful!");
        navigate("/dashboard");
        {
          /* Use navigate to Route the main page  */
        }
      } else {
        setStatus("Invalid username or password.");
      }
    } catch (error) {
      setStatus("Error: Could not connect to server");
    }
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
            onSubmit={sendDataToFlask}
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

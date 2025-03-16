import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure email & password are not empty
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    // Debugging: Check if data is actually saved
    console.log("User registered:", localStorage.getItem("user"));

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-700">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Create Account
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

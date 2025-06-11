import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      console.log("Login successful! Redirecting...");
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-purple-500 cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

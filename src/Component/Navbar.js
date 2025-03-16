import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F8F8FF] bg-opacity-95 backdrop-blur-lg shadow-md z-50 flex items-center">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        
        {/* Logo on Left - Merged into Navbar */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="AI Generator Logo"
            className="h-14 mix-blend-multiply "
          />
        </Link>

        {/* Navigation Links + Login (Aligned to Right) */}
        <div className="flex space-x-8 text-lg font-semibold items-center">
          <Link to="/" className="text-purple-700 hover:text-violet-900 transition-all duration-300">
            Home
          </Link>
          <Link to="/about" className="text-purple-700 hover:text-violet-900 transition-all duration-300">
            About
          </Link>
          <Link to="/contact" className="text-purple-700 hover:text-violet-900 transition-all duration-300">
            Contact
          </Link>

          {/* Login Button */}
          <Link to="/login">
            <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-violet-400 to-purple-600 rounded-lg shadow-md border-2 border-violet-500 hover:bg-purple-700 hover:shadow-lg transition-all transform hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* CSS Animation for Glowing Logo */}
      <style>
        {`
          @keyframes violet-glow {
            0% { filter: drop-shadow(0 0 5px rgba(138, 43, 226, 0.7)); }
            50% { filter: drop-shadow(0 0 20px rgba(138, 43, 226, 1)); }
            100% { filter: drop-shadow(0 0 5px rgba(138, 43, 226, 0.7)); }
          }
          .animate-violet-glow {
            animation: violet-glow 2s infinite alternate;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
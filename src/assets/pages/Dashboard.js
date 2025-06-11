import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import sampleImage from "../../assets/sample-image.png";
const Dashboard = () => {
  const [enabled, setEnabled] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [query, setQuery] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.username) {
          setUserName(userData.username);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // ✅ Updated function to fetch from backend with correct port
  const handleGenerate = async () => {
    if (!query) {
      setError("Please enter a prompt!");
      return;
    }
    setError("");
    setEnabled(true);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-image", // ✅ Updated to port 5001
        { prompt: query }
      );
  
      if (response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
      } else {
        setError("No image received, try again!");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image. Check backend or try again!");
    }
  
    setEnabled(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-200 flex flex-col items-center justify-center p-10 relative">
      
      {/* Profile Section */}
      <div className="absolute top-24 right-10 flex items-center space-x-3">
        <span className="text-lg font-semibold text-purple-800">{userName}</span>
        <FaUserCircle className="w-12 h-12 text-purple-600" />
      </div>

      {/* AI Image */}
      <motion.img
        src={imageUrl || sampleImage}
        alt="AI Illustration"
        className="w-96 h-96 object-cover mb-6 rounded-lg shadow-lg border border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Error Message */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Search & Generate Section */}
      <div className="flex flex-col items-center space-y-6 w-full max-w-3xl mt-2">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Enter your creative prompt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-6 text-lg border border-gray-400 rounded-l-lg shadow-md focus:outline-none h-20"
          />

          {/* Generate Button (Switch) */}
          <Switch
            checked={enabled}
            onChange={handleGenerate}
            className={`relative inline-flex items-center px-6 py-4 border border-purple-600 rounded-r-lg shadow-lg transition ${
              enabled ? "bg-purple-700" : "bg-gray-300"
            } h-20`}
          >
            <span className="text-white font-bold">{enabled ? "Generating..." : "Generate"}</span>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import aiImage from "../assets/ai-art.png";
import aiImage1 from "../assets/ai-art1.png";
import aiImage2 from "../assets/ai-art2.png";

const images = [aiImage, aiImage1, aiImage2];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[120vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE2F8] via-[#D8BFD8] to-[#FFFFFF] text-gray-900 px-24 py-20 relative">
      <div className="grid grid-cols-2 gap-20 items-center w-full max-w-7xl">
        {/* Left Section - Text Content */}
        <div className="flex flex-col justify-center space-y-6 p-8">
          <div className="bg-white/10 backdrop-blur-md border-2 border-transparent rounded-lg p-12 shadow-xl">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600 drop-shadow-lg">
              Welcome to <span className="text-gray-900">AI Image Generator</span>
            </h1>
            <p className="text-xl text-gray-800 mt-4 leading-relaxed">
              Generate stunning AI-powered images with a touch of **futuristic magic**.
            </p>
          </div>
        </div>

        {/* Right Section - Image Slideshow */}
        <div className="flex flex-col items-center p-8">
          <div className="relative p-4 shadow-xl border-4 border-transparent rounded-lg animate-electric-pulse">
            <img
              src={images[currentImage]}
              alt="AI Generated"
              className="w-[600px] h-[500px] rounded-lg shadow-lg transition-all duration-700 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
      <br/>
      <br/>

      {/* Generate Button - Navigates to Login Page */}
      <div className="absolute bottom-16 w-full flex justify-center">
        <button 
          onClick={() => navigate("/login")}
          className="px-10 py-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600 font-bold rounded-md border-2 border-purple-400 hover:bg-purple-500 hover:text-white transition transform hover:scale-110 shadow-lg">
          ⚡ Generate Image ⚡
        </button>
      </div>
    </div>
  );
};

export default Home;

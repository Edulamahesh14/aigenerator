require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

// Debug: Check if API Key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing! Check your .env file.");
  process.exit(1); // Stop the server if no API key is found
}

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "❌ Prompt is required!" });
  }

  try {
    console.log("🟢 Sending request to OpenAI API...");
    
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-2",
        prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log("✅ Image generated successfully:", response.data);
    res.json({ imageUrl: response.data.data[0].url });

  } catch (error) {
    console.error("❌ Error from OpenAI API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate image. Try again!" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

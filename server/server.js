import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chat from "./chat.js";
import tts from "./tts.js";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

// Handle chat (AI response + save into DB)
app.get("/chat", async (req, res) => {
  const { question } = req.query; // Use req.query for GET requests
  if (!question) {
    return res.status(400).json({ error: "Question parameter is required" });
  }

  try {
    // Save user message to the database
    await pool.query(
      "INSERT INTO chat_history (message, sender) VALUES (?, 'user')",
      [question]
    );

    // Get AI response
    const resp = await chat(question);

    // Save bot response to the database
    await pool.query(
      "INSERT INTO chat_history (message, sender) VALUES (?, 'bot')",
      [resp]
    );

    res.json({ message: resp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat error" });
  }
});

// Handle text-to-speech
app.get("/tts", async (req, res) => {
  // Switched to GET
  const { words } = req.query; // Use req.query for GET requests
  if (!words) {
    return res.status(400).json({ error: "Words parameter is required" });
  }

  try {
    const audioData = await tts(words);
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

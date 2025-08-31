import express from "express"; //use for backend JS
import cors from "cors"; // cross-origin resource sharing, allow frontend to access backend
import dotenv from "dotenv"; // create .env file .env stores all secret data
import chat from "./chat.js";
import tts from "./tts.js";

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5001; //backend port code

app.get("/chat", async (req, res) => {
  const resp = await chat(req.query.question); //question is the query parameter in a URL, question is the name you aligned
  res.send(resp); //backend to frondend
});

app.get("/tts", async (req, res) => {
  const audioData = await tts(req.query.words);
  res.setHeader("Content-Type", "audio/mpeg");
  res.send(audioData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// interact with chatgpt via langchain

import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 1, //higher values = more creative/random [0,1]
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const chat = async (question) => {
  const aiMsg = await llm.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant that helps people find information.",
    },
    {
      role: "user",
      content: question,
    },
  ]);
  return aiMsg?.content;
};

export default chat; //only one default one

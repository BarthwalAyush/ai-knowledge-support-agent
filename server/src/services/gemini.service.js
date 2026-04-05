const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(prompt, history = []) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemma-3-27b-it",
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI is currently unavailable.";
  }
}

module.exports = { askGemini };

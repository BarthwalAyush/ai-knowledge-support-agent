const { askGemini } = require("../services/gemini.service");
const {
  findBestKnowledgeMatch,
  saveToKnowledge,
} = require("../services/knowledge.service");

async function chatHandler(req, res) {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const matchedItem = await findBestKnowledgeMatch(message);

    console.log("matchedItem", matchedItem);

    if (matchedItem) {
      return res.json({
        reply: matchedItem.answer,
        source: matchedItem.title,
      });
    }

    const aiResponse = await askGemini(message, history);

    if (aiResponse) {
      saveToKnowledge({
        title: message,
        answer: aiResponse,
      }).catch((err) =>
        console.error("Failed to save AI response:", err.message),
      );

      return res.json({
        reply: aiResponse,
        source: "AI Response",
      });
    }

    return res.json({
      reply: "Sorry, I could not find a relevant answer in the knowledge base.",
    });
  } catch (error) {
    console.error("Chat handler error:", error.message);
    return res.status(500).json({
      reply: "Something went wrong on the server.",
    });
  }
}

module.exports = { chatHandler };

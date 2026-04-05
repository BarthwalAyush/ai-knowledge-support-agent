const mongoose = require("mongoose");

const KnowledgeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    embedding: {
      type: [Number],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Knowledge", KnowledgeSchema);

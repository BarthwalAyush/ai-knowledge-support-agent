const mongoose = require("mongoose");

const KnowledgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Knowledge", KnowledgeSchema);

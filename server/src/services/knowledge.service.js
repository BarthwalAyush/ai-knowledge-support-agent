// const Knowledge = require("../models/Knowledge");

// function extractKeywords(text) {
//   const stopWords = [
//     "a",
//     "an",
//     "the",
//     "is",
//     "are",
//     "was",
//     "were",
//     "what",
//     "how",
//     "why",
//     "when",
//     "where",
//     "who",
//     "do",
//     "does",
//     "did",
//     "can",
//     "could",
//     "would",
//     "should",
//     "i",
//     "my",
//     "me",
//     "we",
//     "you",
//     "it",
//     "in",
//     "on",
//     "at",
//     "to",
//     "for",
//     "of",
//     "and",
//     "or",
//     "but",
//   ];

//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9 \+\-\*\/]/g, "")
//     .split(" ")
//     .filter((word) => word.length > 0 && !stopWords.includes(word));
// }

// function getKeywordOverlapScore(existingKeywords, newKeywords) {
//   if (!newKeywords.length) return 0;

//   const existingSet = new Set(existingKeywords.map((k) => k.toLowerCase()));
//   const matchCount = newKeywords.filter((k) => existingSet.has(k)).length;

//   return matchCount / newKeywords.length;
// }

// function getTitleSimilarity(str1, str2) {
//   const getBigrams = (str) => {
//     const bigrams = new Set();
//     const s = str.toLowerCase().replace(/\s+/g, "");
//     for (let i = 0; i < s.length - 1; i++) {
//       bigrams.add(s[i] + s[i + 1]);
//     }
//     return bigrams;
//   };

//   const bigrams1 = getBigrams(str1);
//   const bigrams2 = getBigrams(str2);

//   const intersection = [...bigrams1].filter((b) => bigrams2.has(b)).length;
//   return (2 * intersection) / (bigrams1.size + bigrams2.size);
// }

// async function findSimilarEntry(title, keywords) {
//   const allEntries = await Knowledge.find().lean();

//   for (const entry of allEntries) {
//     const titleScore = getTitleSimilarity(entry.title, title);
//     const keywordScore = getKeywordOverlapScore(entry.keywords, keywords);

//     console.log(
//       `Comparing with "${entry.title}" → title: ${titleScore.toFixed(2)}, keywords: ${keywordScore.toFixed(2)}`,
//     );

//     if (titleScore >= 0.6 || keywordScore >= 0.5) {
//       return entry;
//     }
//   }

//   return null;
// }

// async function saveToKnowledge({ title, answer }) {
//   const keywords = extractKeywords(title);

//   const similarEntry = await findSimilarEntry(title, keywords);

//   if (similarEntry) {
//     console.log(
//       `Skipping save — similar entry already exists: "${similarEntry.title}"`,
//     );
//     return similarEntry;
//   }

//   const newEntry = await Knowledge.create({ title, answer, keywords });
//   return newEntry;
// }

// async function findBestKnowledgeMatch(message = "") {
//   const userMessage = message.toLowerCase().trim();

//   if (!userMessage) return null;

//   const knowledgeList = await Knowledge.find().lean();

//   const exactMatch = knowledgeList.find(
//     (item) => item.title.toLowerCase().trim() === userMessage,
//   );
//   if (exactMatch) {
//     return exactMatch;
//   }

//   const keywordMatch = knowledgeList.find((item) =>
//     item.keywords.some((keyword) =>
//       userMessage.includes(keyword.toLowerCase()),
//     ),
//   );
//   if (keywordMatch) {
//     return keywordMatch;
//   }

//   return null;
// }

// module.exports = {
//   findBestKnowledgeMatch,
//   saveToKnowledge,
// };

async function saveKnowledge({ title, content }) {
  try {
    // console.log("Saving:", { title, content });

    const embedding = await getEmbedding(title);

    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Invalid embedding generated");
    }

    const doc = await Knowledge.create({
      title,
      content,
      embedding,
    });

    // console.log("Saved successfully:", doc._id);

    return doc;
  } catch (err) {
    console.error("Save error:", err.message);
    throw err;
  }
}
const Knowledge = require("../models/Knowledge");
const { getEmbedding } = require("./embedding.service");

async function findRelevantDocs(message) {
  const queryEmbedding = await getEmbedding(message);

  const docs = await Knowledge.aggregate([
    {
      $vectorSearch: {
        index: "knowledge_vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 10,
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  docs.forEach((doc) => {
    console.log(`=> Match: "${doc.title}" | Score: ${doc.score}`);
  });

  const scoredDocs = docs.filter((doc) => {
    const wordCount = message.trim().split(/\s+/).length;
    const threshold = wordCount <= 4 ? 0.98 : 0.85;
    return doc.score > threshold;
  });

  return scoredDocs.slice(0, 3);
}

module.exports = { findRelevantDocs, saveKnowledge };

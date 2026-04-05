require("dotenv").config();

const { default: mongoose } = require("mongoose");
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

async function listCollections() {
  const collections = await mongoose.connection.db.listCollections().toArray();

  collections.forEach((c) => console.log(c.name));
}

const startServer = async () => {
  try {
    await connectDB();
    await listCollections();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

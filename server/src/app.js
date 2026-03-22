// Express helps us create a web server and APIs easily
const express = require("express");
// CORS allows requests from different origins (like React frontend running on another port)
const cors = require("cors");

const chatRoutes = require("./routes/chat.routes");

// Create an Express application
const app = express();

// This is required because your React frontend will run on a different port
app.use(cors());

// Enable Express to read JSON data from request bodies
app.use(express.json());

// When someone opens http://localhost:5000 in the browser
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/", chatRoutes);

module.exports = app;

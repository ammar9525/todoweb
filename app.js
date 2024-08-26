const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("./conn/conn");

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static frontend
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

// Handle frontend routing, return all requests to React app
app.get("*", (req, res) => { 
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

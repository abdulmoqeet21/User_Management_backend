require("dotenv").config(); ///env
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginUserRoutes");
const cors = require("cors");
const db = require("./dbConnection/db");
const app = express();
const port = 5000;

///connection
db();
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api", userRoutes);
app.use("/api", loginRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

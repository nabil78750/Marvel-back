require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/Marvel");

const app = express();
app.use(express.json());
app.use(cors());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Serveur started");
});

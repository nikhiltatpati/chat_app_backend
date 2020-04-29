const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

//Routes
const authRoutes = require("./routes/index");

const postRoutes = require("./routes/post");

dotenv.config();

const PORT = process.env.PORT || 5000;

//Setting up database
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
});

app.use(express.json());

//Middlewares
app.use(cors());
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}.....`);
});

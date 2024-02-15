require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const users = require("./routes/user.route");
const books = require("./routes/book.router");

app.use("/api/v1", users);
app.use("/api/v1", books);

module.exports = app;

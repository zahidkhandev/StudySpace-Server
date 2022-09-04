const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const app = express();
const createError = require("http-errors");
require("dotenv").config();
require("express-async-errors");
const { v4: uuidv4 } = require("uuid");

//Security packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const ratelimiter = require("express-rate-limit");

app.use(cors());
app.use(helmet());
app.use(xss());

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", () => {
  console.log("user is connected");
});

//ROUTES IMPORT
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/users");

// error handler
const notFoundMiddleware = require("./src/middleware/not-found");
const errorHandlerMiddleware = require("./src/middleware/error-handler");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//connect db
const connectDB = require("./src/db/connect");

app.get("/", (req, res) => {
  res.send(
    `
          <img src='https://sizzr.in/_next/image?url=%2Fimages%2FLogo.png&w=1920&q=75'>
          <h1> Sizzr Api</h1>
          <a href='/docs'>View documentation</a>
          `
  );
});

//--------ROUTES---------

//User

app.use("/api/users", userRoute);
app.use("/api/users/auth", authRoute);

//ROOMS
// app.use("/rooms", roomRoute);

//ERROR HANDLER

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    console.log("db conneted");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

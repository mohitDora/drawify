require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");
const connectDB = require("./utils/db");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const isDev = process.env.NODE_ENV === "development";
const URL = isDev ? "http://localhost:3000" : "https://drawify-dun.vercel.app";

// CORS options
const corsOptions = {
  origin: [URL],
  methods: "POST,GET,PUT,DELETE,HEAD,PATCH",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);

// Create HTTP server and attach Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`User joined board: ${boardId}`);
  });

  socket.on("beginPath", ({ boardId, ...arg }) => {
    socket.to(boardId).emit("beginPath", arg);
  });

  socket.on("drawLine", ({ boardId, ...arg }) => {
    socket.to(boardId).emit("drawLine", arg);
  });

  socket.on("changeConfig", ({ boardId, ...arg }) => {
    socket.to(boardId).emit("changeConfig", arg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Connect to the database and start the server
const PORT = isDev? 5000:"https://drawify-yttj.vercel.app"
connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});

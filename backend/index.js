import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import Tweet from "./tweetModel.js";

const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  const posts = await Tweet.find()

  socket.emit('posts', posts)
  socket.on("new-message", async (data) => {
    const tweet = new Tweet({
      name: data.name,
      tweet: data.tweet
    })

    await tweet.save()

    const newPosts = await Tweet.find()

    socket.emit('new-posts', newPosts)
  });
});

mongoose.connect(
  "mongodb://localhost:27017/tweet",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    httpServer.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  }
);

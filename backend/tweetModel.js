import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  tweet: {
    type: "String",
    required: true,
  },
});

const Tweet = new mongoose.model('Tweet', tweetSchema)
export default Tweet
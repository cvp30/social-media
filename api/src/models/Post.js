import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const postSchema = new mongoose.Schema({
  parentPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
  },
  images: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  shares: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  }],
});

postSchema.plugin(mongoosePaginate);

export default mongoose.model("Post", postSchema);
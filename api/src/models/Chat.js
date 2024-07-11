import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
})

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: true,
  },
})

messageSchema.virtual('timestamp').get(function () {
  const timestamp = this._id.getTimestamp()

  return new Date(timestamp)
});


export const Chat = mongoose.model("Chat", chatSchema)
export const Message = mongoose.model("Message", messageSchema)
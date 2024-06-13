import mongoose from "mongoose";

const followshipSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
})

followshipSchema.virtual('date').get(function () {
  const date = this._id.getTimestamp()

  return new Date(date)
});

export default mongoose.model("Followship", followshipSchema)
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 160,
  },
  location: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  }
})

userSchema.virtual('timestamp').get(function () {
  const timestamp = this._id.getTimestamp()

  return new Date(timestamp)
});

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema)
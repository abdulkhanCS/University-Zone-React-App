const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const postSchema = new Schema(
  {
    college: {
      type: String,
      required: true,
      trim: true,
      unique: false
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      unique: false
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      unique: false
    },
    username: {
      type: String,
      unique: false,
      required: true,
      minLength: 3,
      trim: true
    },
    postTitle: {
      type: String,
      required: true,
      minLength: 3,
      unique: false
    },
    postText: {
      type: String,
      required: true,
      minLength: 3,
      unique: false
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: false
    }
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('ForumPost', postSchema)
module.exports = Post; 
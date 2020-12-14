const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const collegeSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    domains: {
      type: Array,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      trim: true,
    },
    websites: {
      type: Array,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
)

const College = mongoose.model('College', collegeSchema)
module.exports = College; 


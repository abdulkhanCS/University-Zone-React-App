// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    collegeGroups: {
      type: Array
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User; 
// Schema.methods.generateHash = this.function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }
// Schema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password)
// }

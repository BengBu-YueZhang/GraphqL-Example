const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    min: 3,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  createDate: {
    type: Date,
    default: new Date()
  }
})

UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
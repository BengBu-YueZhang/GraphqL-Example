const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  }
})

AuthSchema.options.toObject = {
  transform (doc, ret) {
    ret.id = doc._id
    delete ret._id
    return ret
  }
}

const Auth = mongoose.model('Auth', AuthSchema)

module.exports = Auth

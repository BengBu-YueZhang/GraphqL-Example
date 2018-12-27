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
  roles: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Role'
    }],
    default: []
  },
  createDate: {
    type: Date,
    default: new Date()
  }
})

UserSchema.options.toObject = {
  transform (doc, ret) {
    ret.id = doc._id
    delete ret._id
    return ret
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User

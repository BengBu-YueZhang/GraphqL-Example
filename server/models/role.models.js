const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  auths: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Auth'
    }],
    default: [],
    required: true
  }
})

RoleSchema.options.toObject = {
  transform (doc, ret) {
    ret.id = doc._id
    delete ret._id
    return ret
  }
}

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role

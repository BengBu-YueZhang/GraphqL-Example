const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 用户名
  name: {
    type: String,
    unique: true,
    min: 3,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true,
    min: 6
  },
  // 角色集合
  roles: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Role'
    }],
    default: []
  },
  // 创建时间
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

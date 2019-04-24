const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
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
  },
  uId: {
    type: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
})

NoteSchema.options.toObject = {
  transform (doc, ret) {
    ret.id = doc._id
    delete ret._id
    return ret
  }
}

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
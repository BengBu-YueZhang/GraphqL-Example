const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true,
    min: 6
  },
  createDate: {
    type: Date,
    default: new Date()
  },
  uId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

NoteSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note

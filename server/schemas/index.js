const { mergeTypes } = require('merge-graphql-schemas')
const NoteSchema = require('./note.schema')
const UserSchema = require('./user.schema')

const schemas = [
  NoteSchema,
  UserSchema
]

module.exports = mergeTypes(schemas, { all: true })
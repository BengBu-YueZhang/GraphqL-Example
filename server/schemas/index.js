const { mergeTypes } = require('merge-graphql-schemas')
const NoteSchema = require('./note.schema')
const UserSchema = require('./user.schema')
const CommonSchema = require('./common.schema')

const schemas = [
  NoteSchema,
  UserSchema,
  CommonSchema
]

module.exports = mergeTypes(schemas, { all: true })
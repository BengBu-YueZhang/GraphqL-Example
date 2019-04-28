const NoteResolvers = require('./note.resolvers')
const UserResolvers = require('./user.resolvers')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const moment = require('moment')

// https://github.com/havinhthai/graphql-merge-resolvers star有点少, 怕有坑没有用

const { Query: UserResolversQuery, Mutation: UserResolversMutation } = UserResolvers
const { Query: NoteResolversQuery, Mutation: NoteResolversMutation } = NoteResolvers

module.exports = {
  Query: {
    ...UserResolversQuery,
    ...NoteResolversQuery
  },

  Mutation: {
    ...UserResolversMutation,
    ...NoteResolversMutation
  },
  
  Date: new GraphQLScalarType({
    name: 'Date',
    description: '时间类型标量',
    serialize (value) {
      return moment(value).format('YYYY-MM-DD')
    },
    parseValue (value) {
      return moment(new Date(value))
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return moment(new Date(ast.value))
      }
      return null
    }
  })
}

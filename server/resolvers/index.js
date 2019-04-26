const NoteResolvers = require('./note.resolvers')
const UserResolvers = require('./user.resolvers')

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
  }
}
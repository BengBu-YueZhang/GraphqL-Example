const NoteResolvers = require('./note.resolvers')
const UserResolvers = require('./user.resolvers')

// https://github.com/havinhthai/graphql-merge-resolvers star有点少, 怕有坑没有用

const { Query: UserResolversQuery } = UserResolvers
const { Query: NoteResolversQuery } = UserResolvers

module.exports = {
  Query: {
    ...UserResolversQuery,
    ...NoteResolversQuery
  }
}
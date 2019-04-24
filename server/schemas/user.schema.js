const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: ID!, start: String, pageSize: Int): User!
    me: User
  }

  type User {
    id: ID!
    name: String
    password: String
    createdDate: String
  }
`

module.exports = typeDefs
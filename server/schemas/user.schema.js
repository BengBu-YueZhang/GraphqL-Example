const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    users(pagestart: Int = 1, pagesize: Int = 10): [User]!
    user(id: ID!): User!
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
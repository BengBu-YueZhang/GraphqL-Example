const { gql } = require('apollo-server-koa')

// type Mutation {
//   addUser(user: User!): Response!
//   deleteUser(id: ID!): Response!
// }

const typeDefs = gql`

  type Query {
    list: [User]!
    me(id: ID!): User
  }

  type User {
    id: ID!
    gender: Gender
    name: String
    role: Role
  }

  enum Gender {
    MAN
    WOMAN
  }

  type Role {
    id: ID!
    name: String
  }

  type Response {
    success: Boolean!
    message: String
    data: User
  }
`

module.exports = typeDefs
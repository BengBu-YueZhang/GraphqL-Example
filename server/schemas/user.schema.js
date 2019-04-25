const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    users(pagestart: Int = 1, pagesize: Int = 10): UsersResponse
    user(id: ID!): User!
    me: User
  }

  type Mutation {
    addUser(user: UserRequest): UserResponse
    updateUser(user: UserRequest): UserResponse
    login(user: UserRequest): UserResponse
    logout: UserResponse
  }

  type User {
    id: ID!
    name: String
    password: String
    createdDate: String
  }

  type UsersResponse implements Response {
    code: Int
    msg: String
    data: [User]!
  }

  type UserResponse implements Response {
    code: Int
    msg: String
    token: String
    data: User
  }

  input UserRequest {
    id: ID
    name: String
    password: String
  }
`

module.exports = typeDefs
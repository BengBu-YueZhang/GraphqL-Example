const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    users(pagestart: Int = 1, pagesize: Int = 10): UsersResponse!
    user(id: ID!): UserResponse!
    me: UserResponse!
  }

  type Mutation {
    addUser(user: UserRequest): CommonResponse!
    updateUser(user: UserRequest): CommonResponse!
    login(user: UserRequest): LoginResponse!
    logout: CommonResponse!
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
    data: User
  }

  type LoginResponse implements Response {
    code: Int
    msg: String
    token: String
  }

  input UserRequest {
    id: ID
    name: String
    password: String
  }
`

module.exports = typeDefs
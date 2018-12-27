const makeExecutableSchema = require('graphql-tools')
const RoleSchema = require('./role.schema')
const RoleType = RoleSchema.RoleType

const UserType = `
  type User {
    id: ID!
    name: String
    password: String
    # 用户角色的集合
    roles: [${RoleType}]!
  }
`

const QuerySchema = `
  type Query {
    getUsers: [${UserType}]!
  }
`

const MutationSchema = `
  type Mutation {
  }
`
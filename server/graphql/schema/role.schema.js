const makeExecutableSchema = require('graphql-tools')
const AuthSchema = require('./auth.schema')
const AuthType = AuthSchema.AuthType

const RoleType = `
  type Auth {
    id: ID!
    code: String
    name: String
    auths: [${AuthType}]
  }
`

const QuerySchema = `
  type Query {
  }
`

const MutationSchema = `
  type Mutation {
  }
`

module.exports = {
  RoleType
}

const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    notes: [Note]!
    note(id: ID!): Note
  }

  type Note {
    id: ID!
    title: String!
    detail: String!
    createdDate: String!
    uId: ID!
  }
`

module.exports = typeDefs
const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    notes(pagestart: Int = 1, pagesize: Int = 10): NotesResponse!
    note(id: ID!): NoteResponse
    meNote: NoteResponse
  }

  type Mutation {
    addNote(note: NoteRequest!): CommonResponse!
    updateNote(note: NoteRequest!): CommonResponse!
    deleteNote(id: ID!): CommonResponse!
  }

  type NotesResponse implements Response {
    code: Int
    msg: String
    data: [Note]!
  }

  type NoteResponse implements Response {
    code: Int
    msg: String
    data: Note
  }

  type Note {
    id: ID!
    title: String!
    detail: String!
    createDate: Date
    uId: User
  }

  input NoteRequest {
    id: ID!
    title: String
    detail: String
  }
`

module.exports = typeDefs
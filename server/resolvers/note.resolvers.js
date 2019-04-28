module.exports = {
  Query: {
    notes (_, { pagestart, pagesize }, { dataSources }) {
      return dataSources.NoteDatasource.getNotes({
        pagestart,
        pagesize
      })
    },
    note (_, { id }, { dataSources }) {
      return dataSources.NoteDatasource.getNoteById({
        id
      })
    },
    meNote () {
      return dataSources.NoteDatasource.getCurrentUserNote()
    }
  },
  Mutation: {
    addNote (_, { note }, { dataSources }) {
      return dataSources.NoteDatasource.addNote(note)
    },
    updateNote (_, { note }, { dataSources }) {
      return dataSources.NoteDatasource.updateNote(note)
    },
    deleteNote (_, { id }, { dataSources }) {
      return dataSources.NoteDatasource.deleteNote({
        id
      })
    }
  }
}

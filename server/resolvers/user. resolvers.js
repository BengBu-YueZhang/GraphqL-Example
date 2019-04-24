module.exports = {
  Query: {
    list (_, __, { dataSources }) {
      return dataSources.UserDatasource.getUsers()
    },
    me (_, { id }, { dataSources }) {
      return dataSources.UserDatasource.getUser({ id })
    }
  }
} 
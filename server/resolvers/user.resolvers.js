module.exports = {
  Query: {
    users (_, __, { dataSources }) {
      return dataSources.UserDatasource.getUsers()
    }
  }
}

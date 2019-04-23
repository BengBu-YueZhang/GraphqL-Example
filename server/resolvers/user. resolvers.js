module.exports = {
  Query: {
    list (_, _, { dataSources }) {
      dataSources.UserDatasource.getUsers()
    }
  }
}
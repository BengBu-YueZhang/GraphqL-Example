module.exports = {
  Query: {
    users (_, { pagestart, pagesize }, { dataSources }) {
      return dataSources.UserDatasource.getUsers({
        pagestart,
        pagesize
      })
    }
  }
}

module.exports = {
  Query: {
    users (_, { pagestart, pagesize }, { dataSources }) {
      return dataSources.UserDatasource.getUsers({
        pagestart,
        pagesize
      })
    },
    user (_, { id }, { dataSources }) {
      return dataSources.UserDatasource.getUserById(id)
    },
    me () {
      return dataSources.UserDatasource.getCurrentUser()
    }
  },
  Mutation: {
    addUser (_, { user }, { dataSources }) {
      return dataSources.UserDatasource.addUser(user)
    },
    updateUser (_, { user }, { dataSources }) {
      return dataSources.UserDatasource.updateUser(user)
    }
  }
}

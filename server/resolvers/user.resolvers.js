module.exports = {
  Query: {
    users (_, { pagestart, pagesize }, { dataSources, auth }) {
      return dataSources.UserDatasource.getUsers({
        pagestart,
        pagesize
      }, auth)
    },
    user (_, { id }, { dataSources, auth }) {
      return dataSources.UserDatasource.getUserById({
        id
      }, auth)
    },
    me (_, __, { dataSources, auth }) {
      return dataSources.UserDatasource.getCurrentUser(auth)
    }
  },
  Mutation: {
    addUser (_, { user }, { dataSources, auth }) {
      return dataSources.UserDatasource.addUser(user, auth)
    },
    updateUser (_, { user }, { dataSources, auth }) {
      return dataSources.UserDatasource.updateUser(user, auth)
    },
    login (_, { user }, { dataSources, auth }) {
      return dataSources.UserDatasource.login(user, auth)
    },
    logout (_, __, { dataSources, auth }) {
      return dataSources.UserDatasource.logout(auth)
    }
  }
}

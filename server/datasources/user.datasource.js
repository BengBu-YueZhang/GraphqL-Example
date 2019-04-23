const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://127.0.0.1/user/'
  }

  async getUsers () {
    const { data } = await this.get('list')
    return Array.isArray(data) ? data.map(user => this.userReducer(user)) : []
  }

  userReducer (user) {
    // 对返回的数据，转换为Schema期望的结构
    return user
  }
}

module.exports = UserAPI
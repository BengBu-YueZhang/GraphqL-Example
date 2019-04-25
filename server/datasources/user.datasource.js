const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://127.0.0.1:5000/user/'
  }

  async getUsers (params) {
    const result = await this.get('users', params)
    console.log(result)
  }
}

module.exports = UserAPI

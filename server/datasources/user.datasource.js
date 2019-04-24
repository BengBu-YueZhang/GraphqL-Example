const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://127.0.0.1:5000/user/'
  }

  async getUsers () {
    const result = await this.get('users')
    console.log('result>>>>>', result)
  }
}

module.exports = UserAPI
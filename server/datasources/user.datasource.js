const { RESTDataSource } = require('apollo-datasource-rest')
const config = require('../config')
class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://127.0.0.1:${config.URL.port}/user/`
  }

  async getUsers (params) {
    let { data, msg, code } = await this.get('users', params)
    data = Array.isArray(data) ? data.map(user => this.userReducer(user)) : []
    return {
      data,
      code,
      msg
    }
  }

  async getUserById (params) {
    let { data, msg, code } = await this.get('/', params)
    data = this.userReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  async getCurrentUser () {
    let { data, msg, code } = await this.get('/current')
    data = this.userReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  /**
    * mutation addUser {
        addUser(user: {
          name: "123",
          password: "123"
        }) {
          code
        }
      }
    */
  async addUser (params) {
    let { code, msg } = await this.post('/', { ...params })
    return {
      code,
      msg
    }
  }

  async updateUser (params) {
    let { code, msg } = await this.put('/', { ...params})
    return {
      code,
      msg
    }
  }

  async login (params) {
    let { token, code, msg } = await this.post('/login', { ...params })
    return {
      token,
      code,
      msg
    }
  }

  async logout (params) {
    let data = await this.post('/logout', params)
  }

  userReducer (user) {
    const { id, name, password, createDate } = user
    return {
      id,
      name,
      password,
      createDate
    }
  }
}

module.exports = UserAPI

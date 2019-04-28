const { RESTDataSource } = require('apollo-datasource-rest')
const config = require('../config')
const moment = require('moment')
class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://127.0.0.1:${config.URL.port}/user/`
  }

  async getUsers (params) {
    let { data, msg, code } = await this.get('users', params)
    console.log(data)
    data = Array.isArray(data) ? data.map(user => this.userReducer(user)) : []
    return {
      data,
      code,
      msg
    }
  }

  async getUserById () {
  }

  async getCurrentUser () {
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
    let data = await this.put('/', params)
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

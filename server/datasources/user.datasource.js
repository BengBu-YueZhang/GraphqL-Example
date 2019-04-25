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
    data = Array.isArray(data) ? data.map(user => this.launchReducer(user)) : []
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

  async addUser (params) {
    let data = await this.post('/', params)
  }

  async updateUser (params) {
    let data = await this.put('/', params)
  }

  async login (params) {
    let data = await this.post('/login', params)
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
      createDate: moment(createDate).format('MM-DD-YYYY')
    }
  }
}

module.exports = UserAPI

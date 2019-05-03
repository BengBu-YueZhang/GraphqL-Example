const { RESTDataSource } = require('apollo-datasource-rest')
const config = require('../config')
class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://127.0.0.1:${config.URL.port}/user/`
  }

  // 这里鉴权做的比较蠢，大家不要模仿
  async getUsers (params, auth) {
    let { data, msg, code } = await this.get('users', params, {
      headers: {
        'x-access-token': auth
      }
    })
    data = Array.isArray(data) ? data.map(user => this.userReducer(user)) : []
    return {
      data,
      code,
      msg
    }
  }

  async getUserById (params, auth) {
    let { data, msg, code } = await this.get('/', params, {
      headers: {
        'x-access-token': auth
      }
    })
    data = this.userReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  async getCurrentUser (auth) {
    let { data, msg, code } = await this.get('/current', null, {
      headers: {
        'x-access-token': auth
      }
    })
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
  async addUser (params, auth) {
    let { code, msg } = await this.post('/', { ...params }, {
      headers: {
        'x-access-token': auth
      }
    })
    return {
      code,
      msg
    }
  }

  async updateUser (params, auth) {
    let { code, msg } = await this.put('/', { ...params }, {
      headers: {
        'x-access-token': auth
      }
    })
    return {
      code,
      msg
    }
  }

  async login (params, auth) {
    console.log('login datasource')
    let { token, code, msg } = await this.post('/login', { ...params }, {
      headers: {
        'x-access-token': auth
      }
    })
    return {
      token,
      code,
      msg
    }
  }

  async logout (params, auth) {
    let data = await this.post('/logout', params, {
      headers: {
        'x-access-token': auth
      }
    })
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

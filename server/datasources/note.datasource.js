const { RESTDataSource } = require('apollo-datasource-rest')
const config = require('../config')

class NoteAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://127.0.0.1:${config.URL.port}/note/`
  }

  async getNotes (params, auth) {
    let { data, msg, code } = await this.get('notes', params, {
      headers: {
        'x-access-token': auth
      }
    })
    data = Array.isArray(data) ? data.map(user => this.noteReducer(user)) : []
    return {
      data,
      code,
      msg
    }
  }

  async getNoteById (params, auth) {
    let { data, msg, code } = await this.get('/', params, {
      headers: {
        'x-access-token': auth
      }
    })
    data = this.noteReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  async getCurrentUserNote (auth) {
    let { data, msg, code } = await this.get('/current', null, {
      headers: {
        'x-access-token': auth
      }
    })
    data = this.noteReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  async addNote (params, auth) {
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

  async updateNote (params, auth) {
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

  async deleteNote (params, auth) {
    let { code, msg } = await this.delete('/', { ...params }, {
      headers: {
        'x-access-token': auth
      }
    })
    return {
      code,
      msg
    }
  }

  async noteReducer (note) {
    const { id, title, detail, createDate, uId } = note
    return {
      id,
      title,
      detail,
      createDate,
      uId
    }
  }
}

module.exports = NoteAPI

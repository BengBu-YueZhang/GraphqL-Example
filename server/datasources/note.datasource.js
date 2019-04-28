const { RESTDataSource } = require('apollo-datasource-rest')
const config = require('../config')

class NoteAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://127.0.0.1:${config.URL.port}/note/`
  }

  async getNotes () {
  }

  async getNoteById () {
  }

  async getCurrentUserNote () {
  }

  async addNote () {
  }

  async updateNote () {
  }

  async deleteNote () {
  }
}

module.exports = NoteAPI
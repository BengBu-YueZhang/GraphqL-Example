const { RESTDataSource } = require('apollo-datasource-rest')

class NoteAPI extends RESTDataSource {
  constructor() {
    super()
  }
}

module.exports = NoteAPI
const mongoose = require('mongoose')
const db = mongoose.connection
const config = require('./index')

/**
 * warning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * issues: https://github.com/Automattic/mongoose/issues/6890
 */
module.exports = {
  connect () {
    mongoose.connect(config.mongoServer, {
      useNewUrlParser: true
    })
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('mongo已链接')
    })
  }
}

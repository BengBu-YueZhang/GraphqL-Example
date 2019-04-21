const mongoose = require('mongoose')
const db = mongoose.connection
const mongoUrl = require('./URL').mongo

module.exports = {
  mongoConnect () {
    mongoose.connect(mongoUrl, {
      useNewUrlParser: true
    })
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('mongo已链接')
    })
  }
}

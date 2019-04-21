const URL = require('./URL')
const mongo = require('./mongo')
const redis = require('./redis')

mongo.mongoConnect()

module.exports = {
  URL,
  mongo
}

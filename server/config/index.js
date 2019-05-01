const URL = require('./URL')
const mongo = require('./mongo')
// const redis = require('./redis')
// const jwt = require('./jwt')

mongo.mongoConnect()

module.exports = {
  URL,
  mongo,
  jwt
}

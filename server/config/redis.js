const redis = require("redis")
const client = redis.createClient()

client.on("error", (err) => {
  console.log('Error ' + err)
})

client.on("connect", () => {
  console.log('redis已链接')
})

module.exports = client
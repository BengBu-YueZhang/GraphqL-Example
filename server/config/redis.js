const redis = require("redis")
const client = redis.createClient()

client.auth('root', () => {
  console.log('redis验证成功')
})

client.on("error", (err) => {
  console.log('Error ' + err)
})

client.on("connect", () => {
  console.log('redis已链接')
})

module.exports = client
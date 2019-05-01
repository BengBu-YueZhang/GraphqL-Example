const jwt = require('jsonwebtoken')
const config = require('../config')
const { promisify } = require('util')
const redisClient = require('../config/redis')
const getAsync = promisify(redisClient.get).bind(redisClient)

module.exports = function () {
  return async function (ctx, next) {
    const token = ctx.headers['x-access-token']
    let decoded = null
    if (token) {
      try {
        decoded = await jwt.verify(token, config.jwt.secret)
      } catch (error) {
        ctx.throw(403, 'token失效')
      }
      // token中的id信息
      const { id } = decoded
      try {
        await getAsync(id)
      } catch (error) {
        ctx.throw(403, 'token失效')
      }
      ctx.decoded = decoded
      await next()
    } else {
      ctx.throw(403, '缺少token')
    }
    await next()
  }
}

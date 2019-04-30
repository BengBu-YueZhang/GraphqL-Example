const jwt = require('jsonwebtoken')
const config = require('../config')
const { promisify } = require('util')
const redisClient = require('../config/redis')
const getAsync = promisify(redisClient.get).bind(redisClient)

module.exports = function () {
  return async function (ctx, next) {
    // todo: 这里鉴权判断做的不是很好
    const url = ctx.req.url
    const method = ctx.req.method
    if (url === '/graphql' && method === 'POST') {
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
    } else {
      await next()
    }
  }
}

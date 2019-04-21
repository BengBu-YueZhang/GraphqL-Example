const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./config')
const routes = require('./routes')
const port = config.URL.port

config.mongo.mongoConnect()

onerror(app)

app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

// 打印
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

routes(router)

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(port)

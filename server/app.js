const Koa = require('koa')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const config = require('./config')
const port = config.URL.port

const app = new Koa()
const UserRoute = require('./routes/user.router')

config.mongo.mongoConnect()

app.use(UserRoute.routes(), UserRoute.allowedMethods())
app.use(bodyparser())
app.use(json())

module.exports = app.listen(port)

const Koa = require('koa')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const config = require('./config')
const port = config.URL.port
const cors = require('@koa/cors')

const app = new Koa()
const UserRoute = require('./routes/user.router')

config.mongo.mongoConnect()

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Content-Length',
    'Authorization',
    'Accept',
    'X-Requested-With',
    'x-access-token'
  ]
}))
app.use(UserRoute.routes(), UserRoute.allowedMethods())
app.use(bodyparser())
app.use(json())


module.exports = app.listen(port)

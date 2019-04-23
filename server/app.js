const Koa = require('koa')
const bodyparser = require('koa-bodyparser-graphql')
const config = require('./config')
const port = config.URL.port
const cors = require('@koa/cors')
const UserRoute = require('./routes/user.router')
const { ApolloServer, gql } = require('apollo-server-koa')
const response = require('./middleware/response')
const app = new Koa()

app.use(cors({
  origin: '127.0.0.1:5000',
  credentials: true,
  methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With', 'x-access-token']
}))
app.use(UserRoute.routes(), UserRoute.allowedMethods())
app.use(bodyparser())
app.use(response())

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({
  app,
  path: config.URL.graphql,
})

module.exports = app.listen(port)
const Koa = require('koa')
const bodyparser = require('koa-bodyparser-graphql')
const config = require('./config')
const port = config.URL.port
const cors = require('@koa/cors')
const UserRoute = require('./routes/user.router')
const { ApolloServer } = require('apollo-server-koa')
const response = require('./middleware/response')
const app = new Koa()

const typeDefs = require('./schemas/user.schema')
const UserDatasource = require('./datasources/user.datasource')
const resolvers = require('./resolvers/user. resolvers')

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
  resolvers,
  dataSources: () => ({
    UserDatasource: new UserDatasource()
  })
})

server.applyMiddleware({
  app,
  path: config.URL.graphql,
})

module.exports = app.listen(port)
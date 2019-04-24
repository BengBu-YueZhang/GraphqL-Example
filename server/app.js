const Koa = require('koa')
const glob = require('glob')
const bodyparser = require('koa-bodyparser-graphql')
const cors = require('@koa/cors')
const path = require('path')
const { ApolloServer } = require('apollo-server-koa')
const response = require('./middleware/response')
const config = require('./config')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')
const app = new Koa()

const initRouters = () => {
  const paths = glob.sync(path.resolve('./routes/*.router.js'))
  paths.forEach(path => {
    const route = require(path)
    app.use(route.routes(), route.allowedMethods())
  })
}

app.use(cors({
  origin: '127.0.0.1:5000',
  credentials: true,
  methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With', 'x-access-token']
}))
app.use(bodyparser())
app.use(response())
initRouters()

const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.applyMiddleware({ app, path: config.URL.graphql })

module.exports = app.listen(config.URL.port)
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
const UserDatasource = require('./datasources/user.datasource')
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
  resolvers,
  dataSources: () => ({
    UserDatasource: new UserDatasource()
  }),
  formatError: (err) => {
    // 对错误信息的处理, 我在学习GraphQL过程中发现，GraphQLAPI不能自定义HTTP的状态码
    // 比如你鉴权错误，GraphQL以后会返回200的状态
    // https://github.com/apollographql/apollo-server/issues/549
    return err
  }
})
server.applyMiddleware({ app, path: config.URL.graphql })

module.exports = app.listen(config.URL.port)

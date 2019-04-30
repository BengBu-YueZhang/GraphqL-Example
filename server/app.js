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
const mode = process.env.mode

const initRouters = () => {
  const paths = glob.sync(path.resolve('./routes/*.router.js'))
  paths.forEach(path => {
    const route = require(path)
    app.use(route.routes(), route.allowedMethods())
  })
}

const initDatasource = () => {
  let datasourceMap = {}
  const paths = glob.sync(path.resolve('./datasources/*.datasource.js'))
  const names = paths.map(path => {
    let name = path.split('/datasources/')[1]
    name = name.match(/(.*)\.datasource\.js/)[1]
    let first = name[0].toUpperCase()
    return `${first}${name.slice(1)}Datasource`
  })
  paths.forEach((path, i) => {
    const Datasource = require(path)
    datasourceMap[names[i]] = new Datasource()
  })
  return datasourceMap
}

app.use(cors({
  origin: '*',
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
  context: ({ ctx }) => ({
    auth: ctx.req.headers['x-access-token']
  }),
  dataSources: () => initDatasource(),
  // 内省
  introspection: mode === 'develop' ? true : false,
  formatError: (err) => {
    // 对错误信息的处理, 我在学习GraphQL过程中发现，GraphQLAPI不能自定义HTTP的状态码
    // 比如你鉴权错误，GraphQL以后会返回200的状态
    // https://github.com/apollographql/apollo-server/issues/549
    return err
  }
})
server.applyMiddleware({ app, path: config.URL.graphql })

module.exports = app.listen(config.URL.port)

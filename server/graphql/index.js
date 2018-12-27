/**
 * RESTAPI与GraphQL集成的介绍
 * https://medium.com/@xoor/coding-a-graphql-api-with-node-js-c02d617f49f4
 */

const Router = require('koa-router')
const router = new Router({ prefix: '/graphql' })
const { ApolloServer, gql } = require('apollo-server-koa')
const GraphqlController = require('../controller/graphql.controller')

router.get('/users')

module.exports = router
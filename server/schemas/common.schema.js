const { gql } = require('apollo-server-koa')

const typeDefs = gql`

  # 返回数据的接口
  interface Response {
    code: Int
    msg: String
  }

`

module.exports = typeDefs
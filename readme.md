## 文档

http://graphql.cn/learn/

### GraphQL 入门

基于类型系统进行查询的服务端运行时

```js

/**
 * 定义了me字段为User类型, User类型中id字段为ID类型, name字段为String类型
 */
type Query {
  me: User
}

type User {
  id: ID
  name: String
}

/**
 * 定义每一种字段的解析函数
 */
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

前端可以根据后端定义的各种类型, 发起自己组合的数据结构的查询

```js
// 发起查询
{
  me {
    name
  }
}
// 返回结果
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

### 查询和变更


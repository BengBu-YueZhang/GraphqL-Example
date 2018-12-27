## apollo-server

### 安装

> 我使用的是koa的nodejs框架

```js

// 安装
yarn add apollo-server-koa@rc graphql
```

### REST API

## apollo-client

## 官方文档

> **文档并没有着重实现上的细节，而是更多专注与概念，更多实现的细节看apllo的client和server**, 里面的有些概念，我理解的也不是非常明白。还需要更多的实践

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

#### 字段

> 在GraphQL中可以自由的组合的查询字段

```js

// 查询name字段
// 查询friends中的name字段
{
  hero {
    name
    friends {
      name
    }
  }
}

{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

#### 参数

> 在GraphQL中可以通过括号的形式的传递参数

```js

// 在查询语句中加入id为“1000”的查询
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

#### 别名

查询相同的字段, 可以通过参数作为区分, 但是结果中并不包含参数，这时，字段名就会互相冲突, 我们这时就需要给参数命名别名

```js

// 查询hero字段, 不同的参数, 不同的别名
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}

{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

#### 片段

> 可以进行复用的字段结构

```js

// 定义片段
fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}

// 不同的hero内部的字段是相同的
// 可以复用相同的片段
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
```

##### 在片段内使用变量

> 可以通过变量参数的形式, 生成不同的片段

```js

query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

#### 操作名称

> 我们可以为不同的查询定义不同的名称

```js

// 定义操作名称
// query为操作类型
// GetHeroNameAndSexAndFriends为操作名称
query GetHeroNameAndSexAndFriends {
  hero {
    name
    sex,
    friends: {
      name
    }
  }
}
```

##### 操作类型

> 如果省略操作类型，则默认为query类型，如果省略操作类型也同时无法指定操作名称以及变量定义

- query 查询 
- mutation 修改数据
- subscription

##### 操作名称

> 是你操作的明确定义，可以想象成函数名

#### 变量

> 我们直接把参数写死在query中，并不是一个好主意的。我们会需要动态的修改查询的参数

1. 使用 $variableName 替代查询中的静态值。
2. 声明 $variableName 为查询接受的变量之一。
3. 将 variableName: value 通过传输专用（通常是 JSON）的分离的变量字典中。（?????）

```js

// $episode为变量
// Episode类型
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

##### 变量的定义

$episode: Episode, $变量名: 类型

变量的定义是可选的或者必要的。Episode!, 则是必要的变量。需要进一步了解变量的定义，需要参阅Schema语言

##### 默认变量

与ES6中参数的默认值相同, 采用相同的语法格式。当所有变量都有默认值的时候，你可以不传变量直接调用查询。**如果任何变量作为变量字典的部分传递了，它将覆盖其默认值。**


```js

// $episode变量的默认值为JEDI

query HeroNameAndFriends($episode: Episode = "JEDI") {

}
```

#### 指令

> 可以动态的修改查询结构

```js
// $withFriends是必要的变量
// 通过@include的指令
// 控制查询结构是否包含friends

query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}

{
  "episode": "JEDI",
  "withFriends": false
}
```

GraphQL包含两个核心的指令@include(if: Boolean) 是否包含字段，@skip(if: Boolean)跳过此字段。**服务端可以自定义指令，供客户端使用**

#### 变更（mutations修改后端的数据）

使用mutation的变更类型进行修改操作

```js

// 根据$ep参数以及$review参数创建新的评论
// 嵌套查询字段并返回变更后的字段
// review是输入对象类型， 一种特殊的对象类型，可以作为参数传递。你可以在 Schema 页面上了解到更多关于输入类型的信息。

mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

// 变更的操作
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

##### 变更中的多个字段

查询多个字段是并行执行的，而变更字段（比如一个字段的两个变更操作）是线性执行的。第一个保证在第二个之前执行，以确保我们不会出现竞态。

#### 内联片段

```js

query HeroForEpisode($ep: Episode!) {
  // hero字段返回类型，取决于$ep参数
  hero(episode: $ep) {
    name
    // 当hero   为Droid时
    ... on Droid {
      primaryFunction
    }
    // 当hero为Human时
    ... on Human {
      height
    }
  }
}
```

##### 元字段

有的字段返回的时候，你并不知道字段类型，可以使用__typename获取字段的类型

```js

{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}


// 结果
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}

```

### Schema 和类型


为什么使用Schema, 一个GraphQL查询的结构和结果非常相似，因此即便不知道服务器的情况，你也能预测查询会返回什么结果。但是一个关于我们所需要的数据的确切描述依然很有意义，我们能选择什么字段？服务器会返回哪种对象？这些对象下有哪些字段可用？这便是引入 schema 的原因。

每一个 GraphQL 服务都会定义一套类型，用以描述你可能从那个服务查询到的数据。每当查询到来，服务器就会根据 schema 验证并执行查询。

```js

// 查询hero字段上的name, appearsIn字段
{
  hero {
    name
    appearsIn
  }
}
```


#### 类型语言

```js

// Character表示名为Character的对象类型
// name，appearsIn是Character上的字段
// name为String是内置的标量类型, 无法在查询中对它进行次级选择(无法进行细分的查询)
// String!表示为非空的类型
// [Episode!]!表示一个Episode类型的数组，所以当你查询 appearsIn 字段的时候，你也总能得到一个数组（零个或者多个元素）
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```


### 对象类型和字段

GraphQL schema 中的最基本的组件是对象类型， 它就表示你可以从服务上获取到什么类型的对象

```js

type Character {
  name: String! // name
  appearsIn: [Episode!]!
}
```

### 参数

GraphQL**所有参数必须是具名的**。不能像JavaScript一样接受一个有序的参数列表。

### 查询和变更类型

一个 schema 内有两个特殊类型， Query， Mutation。Query 和 Mutation 定义了查询和更改的入口。

```js

schema {
  query: Query
  mutation: Mutation
}
```

我们需要为一个GraphQL定义一个查询的服务, 变更服务。


```js

// query服务可以查询hero字段以及droid字段
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}

// Mutation服务可以更改age字段
type Mutation {
  age: Number!
}
```

### 标量类型

一个对象类型有自己的名字和字段，而某些时候，这些字段必然会解析到具体数据。这就是标量类型的来源：它们表示对应 GraphQL 查询的叶子节点。这些字段没有任何次级字段。

```js

// name, appearsIn 就是标量类型

{
  hero {
    name
    appearsIn
  }
}
```

### 枚举类型

```js

// 定义枚举值
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

### 列表和非空


#### 修饰符

!, 将字段标记为非空，！也可以用于定义字段的参数，表示一个非空的参数。


#### 列表

```js

// 表示一个内容不能非空的字符串数组
myField: [String!]
myField: null // 有效
myField: [] // 有效
myField: ['a', 'b'] // 有效
myField: ['a', null, 'b'] // 错误


// 表示一个不可为空的字符串数组
myField: [String]!
myField: null // 错误
myField: [] // 有效
myField: ['a', 'b'] // 有效
myField: ['a', null, 'b'] // 有效
```


### Interfaces接口

跟许多类型系统一样，GraphQL 支持接口。一个接口是一个抽象类型，它包含某些字段，而对象类型必须包含这些字段，才能算实现了这个接口。（与TS中的interface类似）

```js

// 定义一个英雄接口
interface Hero {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

```js

// 类型实现了接口
// 但是不像ts一样，类型里可以实现接口没有定义的字段
type Human implements Hero {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Hero {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

但是需要 ⚠️ 注意一点， 查询hero返回的是Hero类型，但是Human，Droid实现了Hero的接口，并定义Hero接口中没有的字段。如果返回了Human，Droid类型的数据，查询会产生错误。因为hero只实现了Hero接口。遇到这种情况可以使用内联片段

```js

query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    // 当hero为Droid类型
    ... on Droid {
      primaryFunction
    }
  }
}
```

### 联合类型

> 联合类型的成员需要是具体对象类型；**你不能使用接口或者其他联合类型来创造一个联合类型**

```js

// 定义SearchResult联合类型
union SearchResult = Human | Droid | Starship
```

如果你需要查询一个返回 SearchResult 联合类型的字段，那么你得使用条件片段才能查询任意字段。因为有的类型包含一些特殊字段。是其他类型所不包含的。

```js

{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

### 输入类型 

常用于mutation中，因为对于更改的操作。使用input作为声明的关键词，用来创建修改对象。

**schema 混淆输入和输出类型。输入对象类型的字段当然也不能拥有参数**

```js

// 创建一条评论的类型
input ReviewInput {
  stars: Int!
  commentary: String
}
```

```js

// 使用输入类型
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

### 验证

1. 片段不能引用其自身或者创造回环（形成递归），无效的查询
2. 只能查询给定类型上的字段（如果该类型没有此字段，查询是无效的）
3. 当我们查询一个字段时，如果其返回值不是标量或者枚举型，那我们就需要指明想要从这个字段中获取的数据（需要指明次级字段）
4. 如果是标量类型，指明次级字段同样是无效的
5. 🌟如果对象是联合类型，比如是Character类型，根据不同的参数，Character可能是Droid|Human类型。如果查询的字段不在Character类型中，那么查询也是无效的。如何解决呢？**使用内联片段, 获取具名片段。例子如下**

```js

// 错误，Character字段中是不包含primaryFunction字段的
{
  hero {
    name
    primaryFunction
  }
}

// 使用具名片段
{
  hero {
    name
    ...DroidFields
  }
}

fragment DroidFields on Droid {
  primaryFunction
}

// 使用内联片段
{
  hero {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

### 执行

如果字段产生标量值，例如字符串或数字，则执行完成。如果一个字段产生一个对象，则该查询将继续执行该对象对应字段的解析器，直到生成标量值。GraphQL 查询始终以标量值结束。

```js

type Query {
  human(id: ID!): Human
}

type Human {
  name: String
  appearsIn: [Episode]
  starships: [Starship]
}

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

type Starship {
  name: String
}
```

```js

// 发起查询
// 每个类型的每个字段都由一个 resolver 函数支持，该函数由 GraphQL 服务器开发人员提供（每一个字段有一个函数返回数据）
{
  human(id: 1002) {
    name
    appearsIn
    starships {
      name
    }
  }
}
```

### 根字段 & 解析器

> 所有查询的入口点

每一个 GraphQL 服务端应用的顶层，必有一个类型代表着所有进入 GraphQL API 可能的入口点，我们将它称之为 Root 类型或 Query 类型。

在这个例子中查询类型提供了一个字段 human，并且接受一个参数 id。这个字段的解析器可能请求了数据库之后通过构造函数返回一个 Human 对象。

```js

Query: {
  human(obj, args, context, info) {
    // 从数据库中获取内容
    return context.db.loadHumanByID(args.id).then(
      userData => new Human(userData)
    )
  }
}
```

### 内省

> 我们有时候会需要去问 GraphQL Schema 它支持哪些查询。GraphQL 通过内省系统让我们可以做到这点！

> 通过__schema, 向GraphQL获取所有可用的字段

```js

{
  __schema {
    types {
      name
    }
  }
}
```

```js

// 结果
// Query, Character, Human, Episode, Droid 都是我们自定义的字段
// String, Boolean 是内建的标量
// __Schema, __Type, __TypeKind, __Field, __InputValue, __EnumValue, __Directive 这些有着两个下划线的类型是内省系统的一部分。
{
  "data": {
    "__schema": {
      "types": [
        {
          "name": "Query"
        },
        {
          "name": "Episode"
        },
        {
          "name": "Character"
        },
        {
          "name": "ID"
        },
        {
          "name": "String"
        },
        {
          "name": "Int"
        },
        {
          "name": "FriendsConnection"
        },
        {
          "name": "FriendsEdge"
        },
        {
          "name": "PageInfo"
        },
        {
          "name": "Boolean"
        },
        {
          "name": "Review"
        },
        {
          "name": "SearchResult"
        },
        {
          "name": "Human"
        },
        {
          "name": "LengthUnit"
        },
        {
          "name": "Float"
        },
        {
          "name": "Starship"
        },
        {
          "name": "Droid"
        },
        {
          "name": "Mutation"
        },
        {
          "name": "ReviewInput"
        },
        {
          "name": "__Schema"
        },
        {
          "name": "__Type"
        },
        {
          "name": "__TypeKind"
        },
        {
          "name": "__Field"
        },
        {
          "name": "__InputValue"
        },
        {
          "name": "__EnumValue"
        },
        {
          "name": "__Directive"
        },
        {
          "name": "__DirectiveLocation"
        }
      ]
    }
  }
}
```

### 如何检验一个特定的类型？

```js

// 查询Droid字段的类型，kind会返回__TypeKind
// __TypeKind是枚举类型，可以是INTERFACE获取Object
// 对于List的包装类型，使用ofType可以查看List中的内容
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}

// 返回Droid所有可用的字段
{
  "data": {
    "__type": {
      "name": "Droid",
      "fields": [
        {
          "name": "id",
          "type": {
            "name": null,
            "kind": "NON_NULL",
            "ofType": {
              "name": "ID",
              "kind": "SCALAR"
            }
          }
        },
        {
          "name": "name",
          "type": {
            "name": null,
            "kind": "NON_NULL",
            "ofType": {
              "name": "String",
              "kind": "SCALAR"
            }
          }
        },
        {
          "name": "friends",
          "type": {
            "name": null,
            "kind": "LIST",
            "ofType": {
              "name": "Character",
              "kind": "INTERFACE"
            }
          }
        },
        {
          "name": "friendsConnection",
          "type": {
            "name": null,
            "kind": "NON_NULL",
            "ofType": {
              "name": "FriendsConnection",
              "kind": "OBJECT"
            }
          }
        },
        {
          "name": "appearsIn",
          "type": {
            "name": null,
            "kind": "NON_NULL",
            "ofType": {
              "name": null,
              "kind": "LIST"
            }
          }
        },
        {
          "name": "primaryFunction",
          "type": {
            "name": "String",
            "kind": "SCALAR",
            "ofType": null
          }
        }
      ]
    }
  }
}
```

### 缓存

在基于入口端点的 API 中，客户端可以使用 HTTP 缓存来确定两个资源是否相同，从而轻松避免重新获取资源。这些 API 中的 URL 是全局唯一标识符，客户端可以利用它来构建缓存。然而，在 GraphQL 中，没有类似 URL 的基元能够为给定对象提供全局唯一标识符。这里提供为 API 暴露这种标识符以供客户端使用的最佳实践。

这是向客户端开发人员提供的强大工具。与基于资源的 API 使用 URL 作为全局唯一主键的方式相同，该系统中提供 id 字段作为全局唯一主键。
(**使用全局id作为缓存？？？**)

```js

{
  starship(id:"3003") {
    id
    name
  }
  droid(id:"2001") {
    id
    name
    friends {
      id
      name
    }
  }
}
```

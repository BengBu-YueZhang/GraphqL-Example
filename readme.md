## 文档

> 文档并没有着重实现上的细节，而是更多专注与概念，更多实现的细节看apllo的client和server

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

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```



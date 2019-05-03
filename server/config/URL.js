const mode = process.env.mode

const config = {
  develop: {
    port: 5000,
    mongo: 'mongodb://localhost/test2',
    graphql: '/graphql'
  },
  production: {
    port: 10010,
    mongo: `mongodb://gql:12345678@127.0.0.1:27017/gql?authMechanism=SCRAM-SHA-1`,
    graphql: '/graphql'
  }
}

module.exports = config[mode]


// db.createUser(
//   {
//     user: "gql",
//     pwd: "12345678",
//     roles: [
//        { role: "dbAdmin", db: "gql" },
//        { role: "readWrite", db: "gql" }
//     ]
//   }
// )
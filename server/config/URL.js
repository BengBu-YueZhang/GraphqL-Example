const mode = process.env.mode

const config = {
  develop: {
    port: 5000,
    mongo: 'mongodb://localhost/test2',
    graphql: '/graphql'
  },
  production: {
    port: 10010,
    mongo: `mongodb://${`gql`}:${12345678}@127.0.0.1:27017/gqldeom?authMechanism=SCRAM-SHA-1`,
    graphql: '/graphql'
  }
}

module.exports = config[mode]

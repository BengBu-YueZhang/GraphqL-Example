const mode = process.env.mode

const config = {
  develop: {
    port: 5000,
    mongo: 'mongodb://localhost/test2',
    graphql: '/graphql'
  },
  production: {
  }
}

module.exports = config[mode]

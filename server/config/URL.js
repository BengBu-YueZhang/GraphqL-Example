const mode = process.env.mode

const config = {
  develop: {
    port: 5000
  },
  production: {
  }
}

module.exports = config[mode]

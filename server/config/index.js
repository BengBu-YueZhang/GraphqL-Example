module.exports = {
  port: 3000,
  mongoServer: process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost/test2'
}

module.exports = {
  port: 3000,
  mongoServer: process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost/test2',
  NODE_ENV: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

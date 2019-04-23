module.exports = {
  async login (ctx, next) {
    console.log('login')
  },

  async getUsers (ctx, next) {
    ctx.result = {
      data: [
        {
          id: '1',
          gender: 0,
          name: 'tom',
          role: {
            id: 1,
            name: 'admin'
          }
        },
        {
          id: '1',
          gender: 1,
          name: 'jack',
          role: {
            id: 1,
            name: 'admin'
          }
        }
      ]
    }
    await next()
  }
}
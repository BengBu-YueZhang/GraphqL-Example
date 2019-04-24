module.exports = {

  async login (ctx, next) {
    console.log('login')
  },

  async getUsers (ctx, next) {
    ctx.result = {
      data: [
        {
          id: '1',
          gender: 'MAN',
          name: 'tom',
          role: {
            id: 1,
            name: 'admin'
          }
        },
        {
          id: '1',
          gender: 'MAN',
          name: 'jack',
          role: {
            id: 1,
            name: 'admin'
          } 
        }
      ]
    }
    await next()
  },

  async getUser (ctx, next) {
    let { id } = ctx.request.query
    ctx.result = {
      data: [
        {
          id: id,
          gender: 'WOMAN',
          name: 'tom',
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
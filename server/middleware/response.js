module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
      const { result } = ctx
      if (result) {
        ctx.response.type = 'json'
        ctx.response.status = 200
        ctx.response.body = result
      }
    } catch (error) {
      ctx.response.type = 'json'
      ctx.response.status = error.status || 500
      ctx.response.body = {
        code: ctx.response.status,
        message: error.message
      }
    }
  }
}
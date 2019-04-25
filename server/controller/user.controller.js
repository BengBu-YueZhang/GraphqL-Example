const UserModel = require('../models/user.model')
const { getSkip } = require('../util')

module.exports = {
  async login (ctx, next) {
  },

  async logout (ctx, next) {
  },

  /**
   * 获取用户列表
   * @param {Number} pagestart 开始位置
   * @param {Number} pagesize 大小
   */
  async getUsers (ctx, next) {
    try {
      let { pagestart, pagesize } = ctx.request.query
      let { skip, limit } = getSkip(pagestart, pagesize, ctx)
      const data = await UserModel.find(null, null, {
        skip,
        limit
      })
      ctx.result = {
        data,
        msg: 'success',
        code: 200
      }
      await next()
    } catch (error) {
      throw error
    }
  },

  async getUserById (ctx, next) {
  },

  async getCurrentUser (ctx, next) {
  },

  async addUser () {
  },

  async updateUser () {
  }
}
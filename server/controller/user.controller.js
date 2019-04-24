const UserModel = require('../models/user.model')

module.exports = {
  async login (ctx, next) {
  },

  async logout (ctx, next) {
  },

  async getUsers (ctx, next) {
    try {
      const data = await UserModel.find()
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
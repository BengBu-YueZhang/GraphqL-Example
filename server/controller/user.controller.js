const UserModel = require('../models/user.model')
const { getSkip } = require('../util')
const { is, isEmpty } = require('ramda')
const bcrypt = require('../config/bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  async login (ctx, next) {
    try {
      const { name, password } = ctx.request.body
      if (isEmpty(name)) {
        ctx.throw(400, `name不能为空`)
      }
      if (isEmpty(password)) {
        ctx.throw(400, `password不能为空`)
      }
      const user = await UserModel.find({ name })
      if (!user) {
        ctx.throw(400, `用户不存在`)
      }
      const equal = await bcrypt.compare(user.password, password)
      if (!equal) {
        ctx.throw(400, `密码错误`)
      }
      const token = jwt.sign(
        {
          id: user._id
        },
        config.jwt.secret,
        {
          expiresIn: config.jwt.timeout
        }
      )
      const redisKey = user._id.toString()
      ctx.result = {
        code: 200,
        msg: 'success',
        token
      }
      await next()
    } catch (error) {
      throw error
    }
  },

  async logout (ctx, next) {
    try {
    } catch (error) {
    }
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

  async addUser (ctx, next) {
    try {
      const { name, password } = ctx.request.body
      if (isEmpty(name)) {
        ctx.throw(400, `name不能为空`)
      }
      if (isEmpty(password)) {
        ctx.throw(400, `password不能为空`)
      }
      if (!is(String, name)) {
        ctx.throw(400, `name必须是字符串`)
      }
      if (!is(String, password)) {
        ctx.throw(400, `password必须是字符串`)
      }
      let user = await UserModel.find({ name })
      if (user) {
        ctx.throw(400, `用户名重复`)
      }
      password = bcrypt.encrypt(password)
      user = new UserModel({ name, password })
      await user.save()
      ctx.result = {
        msg: 'success',
        code: 200
      }
      await next()
    } catch (error) {
      throw error
    }
  },

  async updateUser (ctx, next) {
    try {
      const { id, name } = ctx.request.body
      if (isEmpty(id)) {
        ctx.throw(400, `id不能为空`)
      }
      if (isEmpty(name)) {
        ctx.throw(400, `name不能为空`)
      }
      if (!is(String, name)) {
        ctx.throw(400, `name必须是字符串`)
      }
      await UserModel.findByIdAndUpdate({
        _id: id
      }, {
        $set: {
          name
        }
      })
      ctx.result = {
        msg: 'success',
        code: 200
      }
      await next()
    } catch (error) {
      throw error
    }
  }
}

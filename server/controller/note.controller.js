
const NoteModel = require('../models/note.model')
const mongoose = require('mongoose')
const { is, isEmpty } = require('ramda')

module.exports = {
  async getNotes (ctx, next) {
    try {
      let { uId } = ctx.request.query
      const data = await NoteModel.find({
        uId
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

  async getNoteById (ctx, next) {
    try {
      const { id } = ctx.request.query
      if (isEmpty(id)) {
        ctx.throw(400, `id不能为空`)
      }
      if (!is(String, id)) {
        ctx.throw(400, `id必须是字符串`)
      }
      const data = await NoteModel.findById(id)
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

  async addNote (ctx, next) {
    try {
      const { title, detail } = ctx.request.body
      if (isEmpty(title)) {
        ctx.throw(400, `title不能为空`)
      }
      if (!is(String, title)) {
        ctx.throw(400, `title必须是字符串`)
      }
      if (isEmpty(detail)) {
        ctx.throw(400, `detail不能为空`)
      }
      if (!is(String, detail)) {
        ctx.throw(400, `detail必须是字符串`)
      }
      const { id: uId } = ctx.decoded
      note = new NoteModel({ uId, title, detail })
      await note.save()
      ctx.result = {
        msg: 'success',
        code: 200
      }
      await next()
    } catch (error) {
      throw error
    }
  },

  async updateNote (ctx, next) {
    try {
      const { id, title, detail } = ctx.request.query
      if (isEmpty(id)) {
        ctx.throw(400, `id不能为空`)
      }
      if (!is(String, id)) {
        ctx.throw(400, `id必须是字符串`)
      }
      if (isEmpty(title)) {
        ctx.throw(400, `title不能为空`)
      }
      if (!is(String, title)) {
        ctx.throw(400, `title必须是字符串`)
      }
      if (isEmpty(detail)) {
        ctx.throw(400, `detail不能为空`)
      }
      if (!is(String, detail)) {
        ctx.throw(400, `detail必须是字符串`)
      }
      await NoteModel.findByIdAndUpdate({
        _id: id
      }, {
        $set: {
          title,
          detail
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
  },

  async deleteNote (ctx, next) {
    try {
      const { id } = ctx.request.query
      if (isEmpty(id)) {
        ctx.throw(400, `id不能为空`)
      }
      if (!is(String, id)) {
        ctx.throw(400, `id必须是字符串`)
      }
      await NoteModel.findByIdAndRemove({
        _id: id
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

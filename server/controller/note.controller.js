
const NoteModel = require('../models/note.model')
const { is, isEmpty } = require('ramda')
const { getSkip } = require('../util')

module.exports = {
  async getNotes (ctx, next) {
    try {
      let { pagestart, pagesize } = ctx.request.query
      let { skip, limit } = getSkip(pagestart, pagesize, ctx)
      const data = await NoteModel.find(null, null, {
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
  },

  async deleteNote (ctx, next) {
    const { title, detail } = ctx.request.query
  }
}
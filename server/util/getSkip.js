const { is } = require('ramda')

/**
 * 对mongo进行分页处理
 */
function getSkip (pagestart, pagesize, ctx) {
  pagestart = parseInt(pagestart, 10)
  pagesize = parseInt(pagesize, 10)
  if (!is(Number, pagestart)) {
    return ctx.throw(400, 'pagestart应当是Number类型')
  }
  if (!is(Number, pagesize)) {
    return ctx.throw(400, 'pagesize应当是Number类型')
  }
  let skip = pagesize * (pagestart - 1)
  return {
    skip,
    limit: pagesize
  }
}

module.exports = getSkip

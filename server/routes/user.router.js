const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const UserController = require('../controller/user.controller')

// router.get('/login', UserController.login)
// router.get('/list', UserController.getUsers)
// router.get('/', UserController.getUser)

module.exports = router
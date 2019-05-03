const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const UserController = require('../controller/user.controller')
const authentication = require('../middleware/authentication')

router.get('/', authentication(), UserController.getUserById)
router.post('/', UserController.addUser)
router.put('/', authentication(), UserController.updateUser)
router.get('/users', authentication(), UserController.getUsers)
router.get('/current', authentication(), UserController.getCurrentUser)
router.post('/login', UserController.login)
router.post('/logout', authentication(), UserController.logout)

module.exports = router

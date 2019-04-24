const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const UserController = require('../controller/user.controller')

router.get('/', UserController.getUserById)
router.post('/', UserController.addUser)
router.put('/', UserController.updateUser)
router.get('/users', UserController.getUsers)
router.get('/current', UserController.getCurrentUser)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

module.exports = router

const Router = require('koa-router')
const router = new Router({ prefix: '/note' })
const NoteController = require('../controller/note.controller')

router.get('/notes', NoteController.getNotes)
router.get('/', NoteController.getNoteById)
router.post('/', NoteController.addNote)
router.put('/', NoteController.updateNote)
router.delete('/', NoteController.deleteNote)

module.exports = router
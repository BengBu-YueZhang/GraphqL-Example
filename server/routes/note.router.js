const Router = require('koa-router')
const router = new Router({ prefix: '/note' })
const NoteController = require('../controller/note.controller')
const authentication = require('../middleware/authentication')

router.get('/notes', authentication(), NoteController.getNotes)
router.get('/', authentication(), NoteController.getNoteById)
router.post('/', authentication(), sNoteController.addNote)
router.put('/', authentication(), NoteController.updateNote)
router.delete('/', authentication(), NoteController.deleteNote)

module.exports = router

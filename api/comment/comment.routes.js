const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getComments, addComment, deleteComment } = require('./comment.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getComments)
router.post('/', log, addComment)
router.delete('/:id', deleteComment)
// router.post('/',  log, requireAuth, addReview)

module.exports = router

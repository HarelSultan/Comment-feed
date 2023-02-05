const logger = require('../../services/logger.service')
const commentService = require('./comment.service')

async function getComments(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || '',
        }
        const comments = await commentService.query(filterBy)
        console.log(comments)
        res.send(comments)
    } catch (err) {
        logger.error('Cannot get comments', err)
        res.status(500).send({ err: 'Failed to get comments' })
    }
}

async function deleteComment(req, res) {
    try {
        const deletedCount = await commentService.remove(req.params.id)
        console.log(deletedCount)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove comment' })
        }
    } catch (err) {
        logger.error('Failed to delete comment', err)
        res.status(500).send({ err: 'Failed to delete comment' })
    }
}

async function addComment(req, res) {
    try {
        let comment = req.body
        comment = await commentService.add(comment)
        res.send(comment)
    } catch (err) {
        logger.error('Failed to add comment', err)
        res.status(500).send({ err: 'Failed to add comment' })
    }
}

module.exports = {
    getComments,
    deleteComment,
    addComment,
}

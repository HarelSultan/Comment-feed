const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('comment')
        return await collection.find(criteria).toArray()
    } catch (err) {
        logger.error('cannot find comments', err)
        throw err
    }
}

async function remove(commentId) {
    try {
        const collection = await dbService.getCollection('comment')
        const criteria = { _id: ObjectId(commentId) }
        const { deletedCount } = await collection.deleteOne(criteria)
        console.log(commentId, deletedCount)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove comment ${commentId}`, err)
        throw err
    }
}

async function add(comment) {
    try {
        const commentToAdd = {
            email: comment.email,
            txt: comment.txt,
        }
        const collection = await dbService.getCollection('comment')
        await collection.insertOne(commentToAdd)
        console.log(collection)
        return commentToAdd
    } catch (err) {
        logger.error('cannot insert comment', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) criteria.txt = filterBy.txt
    if (filterBy.email) criteria.email = filterBy.email
    return criteria
}

module.exports = {
    query,
    remove,
    add,
}

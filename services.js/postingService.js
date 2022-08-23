const postingDao = require('../models/postingDao')

const createPosting = async (userId, contents) => {
    await postingDao.createPosting(userId, contents);
    return await postingDao.getPostings()
}

const updatePosting = async (postId, contents) => {
    await postingDao.updatePosting(postId, contents);
    return await postingDao.getPostings()
}

const deletePosting = async (postId) => {
    await postingDao.deletePosting(postId);
    return await postingDao.getPostings()
}

const readByIdPosting = async (userId) => {
    return postingDao.readByIdPosting(userId);
}

module.exports = { createPosting, updatePosting, deletePosting, readByIdPosting }
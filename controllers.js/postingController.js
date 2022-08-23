const posingService = require('../services/posingService')

// posting read
const readByIdPosting = async (req, res) => {
    const {userId} = req.query
    const result = await posingService.readByIdPosting(userId);
    res.status(201).json({ message: result })
}

// posting create
const createPosting = async (req, res) => {
    const {userId, contents} = req.body

    const haskey = {userId:false, contents:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key}이/가 없습니다` })
        return;
    }
    }

    const postList = await posingService.createPosting(userId, contents);
    console.log(postList)

    res.status(201).json({ message: "userPosting" })
}

// posting update
const updatePosting = async (req, res) => {
    const {postId, contents} = req.body

    const haskey = {postId:false, contents:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key}이/가 없습니다` })
        return;
    }
    }

    const postList = await posingService.updatePosting(postId, contents);
    res.json({ message: postList})
}

// posting delete
const deletePosting = async (req, res) => {
    const {postId} = req.body

    const haskey = {postId:false};
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key}이/가 없습니다` })
        return;
    }
    }

    const postList = await posingService.deletePosting(postId);
    res.json({ message: postList})
}

module.exports = { createPosting ,updatePosting ,deletePosting , readByIdPosting  }
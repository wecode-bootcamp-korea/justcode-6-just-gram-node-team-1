const userService = require('../services/userService')

const createUser = async (req, res) => {
    const {name, email, password, profileImage} = req.body

    const haskey = {name:false, email:false, password:false}; // 배열이 아닌 객체로 해주는 이유는 객체는 순서대로 값이 나열되지 않는다
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

    await userService.createUser(name, email, password, profileImage);

    res.status(201).json({ message: "userCreated" })
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    const haskey = {email:false, password:false}; 
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

    try{
        const result = await userService.loginUser(email, password);
        res.json({ message: result})
    }catch(err){
        console.log(err)
        res.status(err.statusCode || 500).json({message:err.message})
    }
    
}

module.exports = {createUser, loginUser}
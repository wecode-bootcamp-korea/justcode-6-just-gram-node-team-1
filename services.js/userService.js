const userDao = require('../models/userDao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (name, email, password, profileImage) => {
    const salt = bcrypt.genSaltSync(12);
    const hsahedPw = bcrypt.hashSync(password, salt)

    const user = await userDao.createUser(name, email, hsahedPw, profileImage);
    return user;
}

const loginUser = async (email, password) => {
    const user = await userDao.getUserByEmail(email);
    // 없으면 -> 없는 유저입니다
    if(!user){
        const error = new Error ("USER_UNDEFINED")
        error.statusCode = 400
        throw error
    }
    // 있으면 -> 유저 데이터 및 유저 비밀번호 디비에서 꺼내오고, 
    // 디비에서 꺼내온 유저 비밀번호랑 새로 입력한 비밀번호 일치한지 확인
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if(isPasswordCorrect === false){
        const error = new Error ("INVALID_PASSWORD" )
        error.statusCode = 400
        throw error
    }else if(isPasswordCorrect === true){
        // token 생성
        var token = jwt.sign({userId: user.id}, 'process.evn.secretKey')
        return { message: "LOGIN_SUCCESS", token : token}
        
    }
}

module.exports = {createUser, loginUser}
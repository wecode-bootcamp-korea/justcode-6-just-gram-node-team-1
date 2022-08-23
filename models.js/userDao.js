const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch(()=> {
  console.log("fail")
})

const createUser = async (name, email, hashedPw, profileImage)=>{
    const user =  await myDataSource.query(
        `INSERT INTO users ( nickname, email, password, profile_image)
        VALUES( ?, ?, ?, ?)`, [name, email, hashedPw, profileImage]
        )
    return user
}

const getUserByEmail = async (email)=>{
  const [user] =  await myDataSource.query( 
    ` SELECT id, email, password FROM users WHERE email = ?`, [email])
  return user
}

module.exports = {createUser, getUserByEmail}
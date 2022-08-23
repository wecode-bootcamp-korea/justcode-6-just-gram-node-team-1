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

const createPosting = async (userId, contents)=>{
  const DataSource = myDataSource.query(
      `INSERT INTO postings (user_id, contents)
      VALUES(?, ?)`, [userId, contents])
}

const readByIdPosting = async (userId)=>{
  const ByIdPosting = await myDataSource.query(`
    SELECT
      users.id as user_id,
      users.nickname,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', postings.id,
          'postingContents', postings.contents
        )
      ) as postings
    FROM justgram.postings
    JOIN justgram.users ON users.id = postings.user_id
    WHERE users.id = ?
    GROUP BY users.id
  ;`, [userId])
  return ByIdPosting
}

const getPostings = async (email)=>{
  const posting = await myDataSource.query('SELECT * FROM postings')
  return posting
}

const updatePosting = async (postId, contents)=>{
  await myDataSource.query(
    `UPDATE postings SET contents = ? WHERE id = ?`, [contents, postId])
}

const deletePosting = async (postId)=>{
  await myDataSource.query(
      `DELETE FROM postings WHERE id = ?`, [postId])
}

module.exports = {createPosting, readByIdPosting, updatePosting, deletePosting, getPostings}
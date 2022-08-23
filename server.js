const dotenv = require("dotenv").config(); 
const express = require('express')
const app = express();
const router = require('./routers');
app.use(express.json(), router);


app.get('/ping', (req, res) => {
  res.status(200).send('/pong')
  
})

app.listen(8000, () => {
  console.log('server is listening on PORT 8000')
})
const express = require('express')

const postingController = require("../controllers/postingController")

const router = express.Router();

router.get('/user', postingController.readByIdPosting)
router.post('/create', postingController.createPosting)
router.post('/update', postingController.updatePosting)
router.delete('/delete', postingController.deletePosting)


module.exports = router;
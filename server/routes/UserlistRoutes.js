const express = require('express')
const { createUser }= require('../controllers/UserController')
const authenticateJWT = require('../middleware/authMiddleware');


const router = express.Router()

router.post('/create',createUser);



module.exports=router;
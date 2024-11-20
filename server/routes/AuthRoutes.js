const express = require('express')
const { loginUser }= require('../controllers/AuthController.js')

const router = express.Router()

router.post('/login',loginUser)

module.exports=router;
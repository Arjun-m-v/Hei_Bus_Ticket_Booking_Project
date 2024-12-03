const express = require('express')
const { createBus }= require('../controllers/BookingController')
// const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router()

// router.post('/create',createBus);


module.exports=router;
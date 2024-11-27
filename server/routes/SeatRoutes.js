const express = require('express')
const { createSeat,getSeatById,getSeats,getSeatsByBusId }= require('../controllers/SeatController')
// const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/create',createSeat);

router.get('/get/:id',getSeatById);

router.get('/getall',getSeats);

router.get('/getall/:id',getSeatsByBusId);

router.get('/edit/:id',editSeat);

module.exports=router;

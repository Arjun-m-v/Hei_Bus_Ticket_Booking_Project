const express = require('express')
const { createSeat,createSeats,getSeatById,getSeats,getSeatsByBusId,updateSeat,deleteSeat }= require('../controllers/SeatController')
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/create',authenticateJWT,createSeat);

router.post('/createSeats',createSeats);

router.get('/get/:id',authenticateJWT,getSeatById);

router.get('/getall',authenticateJWT,getSeats);

router.get('/getall/:id',getSeatsByBusId);

router.put('/update/:id',updateSeat);

router.delete('/delete/:id',deleteSeat);




module.exports=router;
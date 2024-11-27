const express = require('express')
const { createSeat,getSeatById,getSeats,getSeatsByBusId,updateSeat,deleteSeat }= require('../controllers/SeatController')
// const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/create',createSeat);

router.get('/get/:id',getSeatById);

router.get('/getall',getSeats);

router.get('/getall/:id',getSeatsByBusId);

router.put('/update/:id',updateSeat);

router.delete('/delete/:id',deleteSeat);




module.exports=router;
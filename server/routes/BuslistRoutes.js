const express = require('express')
const { createBus,getBuses,getBusById,updateBus,deleteBus }= require('../controllers/BusController')
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/create',authenticateJWT,createBus);

router.get('/getall',authenticateJWT,getBuses);

router.get('/get/:id',authenticateJWT,getBusById);

router.put('/update/:id',authenticateJWT,updateBus);

router.delete('/delete/:id',authenticateJWT,deleteBus);




module.exports=router;
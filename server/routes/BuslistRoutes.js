const express = require('express')
const { createBus,getBuses,getBusById,updateBus,deleteBus }= require('../controllers/BusController')
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/create',createBus);

router.get('/getall',authenticateJWT,getBuses);

router.get('/get/:id',getBusById);

router.put('/update/:id',updateBus);

router.delete('/delete/:id',authenticateJWT,deleteBus);




module.exports=router;





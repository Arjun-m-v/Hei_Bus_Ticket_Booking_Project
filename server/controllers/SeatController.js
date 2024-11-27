const { where } = require('sequelize');
const db = require('../models/index')
const Seat = db.seat;

const createSeat = async (req,res)=>{
    try {
        const { seatNumber,isAvailable,price,busId} = req.body;
  
        if (!seatNumber || !isAvailable || !price || !busId) {
          return res.status(400).send({ success: false, message: 'Please provide all required fields.' });
        }
    
        const data = {
          seatNumber,isAvailable:'seat'? true : false,price,busId
        }
    
        const details = await Seat.create(data); 
        if (!details) {
          return res.status(400).send({ success: false, message: 'Error got while saving time..!' });
        }
        res.status(201).send({ success: true, message: 'Seat created successfully.' });
      } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error creating Seat.', error });
      }
}

const getSeatById = async (req,res)=>{
    try {
    console.log(req.params.id);
      const SeatId = req.params.id;
      
      if(!SeatId){
        return res.status(404).send({
          success: false,
          message: 'Invalid or Provide Seat Id'
      })
    }
    const data = await Seat.findByPk(SeatId);
  
    if(!data){
      return res.status(404).send({
        success: false,
        message: 'No Records Found'
      })
    }
    res.status(200).send({
      success: true,
      seatDetails: data,
      
  })
    } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Get Seat by id API',
          error
      })
    }
  }

  const getSeats = async (req,res)=>{
    try {
      const data = await Seat.findAll(); 

      if(!data){
        return res.status(404).send({
          success:false,
          message:'No Records Found'
        })
      }
      res.status(200).send({
        success:true,
        message:'all Seats Records',
        totalSeats: data.length,
        data: data,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
      success: false,
      message: 'Error in Geting all Seats API',
      error
    })
    }
  }

  const getSeatsByBusId = async (req,res)=>{
    try {
      const id = req.params.id;
        const data = await Seat.findAll({
          where: {
            busId: id
          }
        })
  
        if(!data){
          return res.status(404).send({
            success:false,
            message:'No Records Found'
          })
        }
        res.status(200).send({
          success:true,
          message:'Bus Seats Records',
          totalSeats: data.length,
          data: data,
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: 'Error in Geting all Seats API',
        error
      })
      }
    }

  const updateSeat =async(req,res)=>{
    try {
      const seatId = req.params.id
      if(!seatId){
        return res.status(404).send({
          success:false,
          message:'Invalid Id or Missing Id',
        })
      }
      const { seatNumber,isAvailable,price,busId } = req.body
      const data = await Seat.update(
        { seatNumber,isAvailable,price,busId },
        {
          where:{
            id:seatId
          }
        }
      )
      if(!data){
        return res.status(500).send({
          success: false,
          message: 'Error In Update Data',
      })
      }
      res.status(200).send({
              success: true,
              message: 'Seat Details Updated'
      })
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: 'Error In update Seat API',
        error
      })
    }
  }

  const deleteSeat = async (req,res)=>{
    try {
      const seatId = req.params.id
      if(!seatId){
        return res.status(404).send({
          success: false,
          message: 'Please Provide Valid seat Id'
      })
      }
      await Seat.destroy({
        where:{
            id:seatId
            }
        }
    )
    res.status(200).send({
        success: true,
        message: 'Seat Deleted Successfully',
    })
    } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Delete Seat API',
          error,
      })
    }
  }


module.exports = { createSeat,getSeatById,getSeats,getSeatsByBusId,updateSeat,deleteSeat };

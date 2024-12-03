const { where } = require('sequelize');
const db = require('../models/index')
const Seat = db.seat;

const createSeat = async (req, res) => {
  try {
      const { seatNumber, isAvailable, price, busId } = req.body;

      // Validate the required fields
      if (!seatNumber || !price || !busId) {
          return res.status(400).send({ success: false, message: 'Please provide all required fields.' });
      }

      // Default `isAvailable` to true if it's not provided or is an invalid value
      const seatAvailable = (isAvailable === undefined || isAvailable === '') ? true : Boolean(isAvailable);

      // Ensure seatNumber is a valid value (not empty or invalid)
      if (!seatNumber.trim()) {
          return res.status(400).send({ success: false, message: 'Seat number cannot be empty.' });
      }
      
      // const hashedPassword = await bcryptjs.hash(password, saltRounds);
      // console.log(`Hashed password: `, hashedPassword);


      const data = {
          seatNumber,
          isAvailable: seatAvailable,
          price,
          busId
      };

      const details = await Seat.create(data);
      console.log("Seat created:", details);

      if (!details) {
          return res.status(400).send({ success: false, message: 'Error while saving seat data.' });
      }
      res.status(201).send({ success: true, message: 'Seat created successfully.' });
  } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Error creating seat.', error });
  }
};


const createSeats = async (req, res) => {
  try {
      const { totalSeats, price, busId } = req.body;

      // Validate the required fields
      if (!totalSeats || !price || !busId) {
          return res.status(400).send({
              success: false,
              message: 'Please provide all required fields (totalSeats, price, busId).',
          });
      }

      // Create seats dynamically with numbers like 1A, 2A, ..., totalSeats
      const seatData = [];
      for (let i = 1; i <= totalSeats; i++) {
          seatData.push({
              seatNumber: `${i}A`, // Format for seat naming
              isAvailable: true, // Default to true
              price,
              busId,
          });
      }

      // Bulk insert seats into the database
      const createdSeats = await Seat.bulkCreate(seatData);

      if (!createdSeats) {
          return res.status(500).send({
              success: false,
              message: 'Error while creating seats.',
          });
      }

      res.status(201).send({
          success: true,
          message: `${totalSeats} seats created successfully.`,
          seats: createdSeats,
      });
  } catch (error) {
      console.error('Error creating seats:', error);
      res.status(500).send({
          success: false,
          message: 'Error while creating seats.',
          error,
      });
  }
};





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


module.exports = { createSeat,getSeatById,getSeats,getSeatsByBusId,updateSeat,deleteSeat,createSeats };

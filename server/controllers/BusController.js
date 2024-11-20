// const bcryptjs = require('bcryptjs')
// const db = require("../config/db");
const db = require('../models/index')
const Buses = db.bus;
// const saltRounds = 10;



const createBus = async (req, res) => {
    try {
      const { name,reg_no,source,destination,departure_time,arrival_time,bus_type,total_seats,available_seats,price_per_seat } = req.body;

      if (!name || !reg_no || !source || !destination || !departure_time || !arrival_time || !bus_type || !total_seats || !available_seats || !price_per_seat) {
        return res.status(400).send({ success: false, message: 'Please provide all required fields.' });
      }
  
      const data = {
        name,reg_no,source,destination,departure_time,arrival_time,bus_type,total_seats,available_seats,price_per_seat
      }
  
      const details = await Buses.create(data);
      if (!details) {
        return res.status(400).send({ success: false, message: 'Error got while saving time..!' });
      }
      res.status(201).send({ success: true, message: 'bus created successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Error creating bus.', error });
    }
  };


const getBuses= async (req,res)=>{
  try{
    const data=await Buses.findAll();
    console.log("hi:",data);
    
    if(!data){
      return res.status(404).send({
        success: false,
        message: 'No Records Found'
      })
    }
    res.status(200).send({
      success: true,
      message: 'All Buses Records',
      totalBuses: data.length,
      data: data,
  })
} catch (error) {
  console.log(error);
  res.status(500).send({
      success: false,
      message: 'Error in Geting all Buses API',
      error
  })
}
};


const getBusById = async (req,res)=>{
  try {
    const busId = req.params.id;
    if(!busId){
      return res.status(404).send({
        success: false,
        message: 'Invalid or Provide Bus Id'
    })
  }
  const data = await Buses.findByPk(busId);

  if(!data){
    return res.status(404).send({
      success: false,
      message: 'No Records Found'
    })
  }
  res.status(200).send({
    success: true,
    busDetails: data,
    
})
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error in Get Bus by id API',
        error
    })
  }
}


const updateBus = async (req,res) =>{
  try {
    const busId = req.params.id
    if(!busId){
      return res.status(404).send({
        success:false,
        message:'Invalid Id or Missing Id',
      })
    }
    const { name,reg_no,source,destination,departure_time,arrival_time,bus_type,total_seats,available_seats,price_per_seat } = req.body
    const data = await Buses.update(
      { name,reg_no,source,destination,departure_time,arrival_time,bus_type,total_seats,available_seats,price_per_seat },
      {
        where:{
          id:busId
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
            message: 'Students Details Updated'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error In update Student API',
        error
    })
  }
}



const deleteBus = async (req, res) => {
  try {
      const busId = req.params.id
      if (!busId) {
          return res.status(404).send({
              success: false,
              message: 'Please Provide Valid bus Id'
          })
      }
      await Buses.destroy({
          where:{
              id:busId
              }
          }
      )
      res.status(200).send({
          success: true,
          message: 'Bus Deleted Successfully',
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Delete Bus API',
          error,
      })

  }
}

  
  module.exports = { createBus,getBuses,getBusById,updateBus,deleteBus };
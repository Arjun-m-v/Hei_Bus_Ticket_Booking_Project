const db = require('../models/index')
const Buses = db.bus;
const Seat = db.seat;
const { Op } = require('sequelize'); 
const bcryptjs = require('bcryptjs')
const saltRounds = 10;




const createBus = async (req, res) => {
    try {
      const { name,reg_no,source,destination,departure_time,arrival_time,bus_type } = req.body;

      if (!name || !reg_no || !source || !destination || !departure_time || !arrival_time || !bus_type) {
        return res.status(400).send({ success: false, message: 'Please provide all required fields.' });
      }

      // const hashedPassword = await bcryptjs.hash(password, saltRounds);
      // console.log(`Hashed password: `, hashedPassword);
  
      const data = {
        name,reg_no,source,destination,departure_time,arrival_time,bus_type
      }
  
      const details = await Buses.create(data);
      if (!details) {
        return res.status(400).send({ success: false, message: 'Error got while saving time..!' });
      }
      res.status(201).send({ success: true, message: 'bus created successfully.',
        busId: details.id, // Include the auto-generated ID here
        busDetails: details
       });
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
    const { name,reg_no,source,destination,departure_time,arrival_time,bus_type } = req.body
    const data = await Buses.update(
      { name,reg_no,source,destination,departure_time,arrival_time,bus_type },
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
      console.log("this is this:",req.params.id);
      
      if (!busId) {
          return res.status(404).send({
              success: false,
              message: 'Please Provide Valid bus Id'
          })
      }
      

      await Seat.destroy({
        where: {
           busId: busId 
          }
      }
      );

      await Buses.destroy({
          where: {
             id: busId 
            }
      });

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


const searchBus = async (req, res) => {
  try {
      const { source, destination } = req.query;
      // console.log("hiiiiii:", req.query);
      

      if (!source && !destination) {
          return res.status(400).send({ success: false, message: "Please provide at least one search term (source or destination)" });
      }

      const whereClause = {};
      if (source) {
          whereClause.source = { [Op.like]: `%${source}%` };
      }
      if (destination) {
          whereClause.destination = { [Op.like]: `%${destination}%` };
      }

      const data = await Buses.findAll({
          where: whereClause,
      });

      if (data.length === 0) {
          return res.status(404).send({
              success: false,
              message: 'No matching buses found',
          });
      }

      res.status(200).send({
          success: true,
          message: 'Search Results',
          data,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: 'Error in search API',
          error,
      });
  }
};






  
  module.exports = { createBus,getBuses,getBusById,updateBus,deleteBus,searchBus };
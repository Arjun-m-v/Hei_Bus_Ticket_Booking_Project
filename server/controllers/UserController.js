const db = require('../models/index')
const User = db.user;
const bcryptjs = require('bcryptjs')
const saltRounds = 10;
const jwt = require('jsonwebtoken'); 

const createUser = async (req, res) => {
    try {
      const { username,email,password } = req.body;

      if (!username || !email || !password ) {
        return res.status(400).send({ success: false, message: 'Please provide all required fields.' });
      }
  

      const hashedPassword = await bcryptjs.hash(password, saltRounds);
      console.log(`Hashed password: `, hashedPassword);

      const data = {
        username,
        email,
        password: hashedPassword,
        role: false,
      };

      // const data = {
      //   username,email,password:hashedPassword,role:'user'? false : true
      // }
      
      const details = await User.create(data);
      if (!details) {
        return res.status(400).send({ success: false, message: 'Error got while saving time..!' });
      }


      const token = jwt.sign(
        { id: details.id, role: details.role }, // Payload
        process.env.JWT_SECRET, // Secret key from environment
        { expiresIn: '1h' } // Token validity
      );
  


      res.status(201).send({ success: true, message: 'user created successfully.',token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Error creating user.', error });
    }
  };


  
  module.exports = { createUser };
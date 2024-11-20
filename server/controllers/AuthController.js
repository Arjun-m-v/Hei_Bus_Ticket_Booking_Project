const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const db = require('../models/index')

const user = db.user

const loginUser = async (req,res) =>{
    console.log(req.body);
    
    try {
        console.log("Login attempt with email:", req.body.email);
        const data = await user.findOne({
            where: {
                email: [req.body.email]
              },
        });
        

        if (!data || data.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Email does not exist'
            });
        }

        const isMatch = await bcryptjs.compare(req.body.password, data.password);
        
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password'
            });
        }


        const token=jwt.sign(
            { id:data.id,email:data.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );


        console.log("User found and authenticated"); // Log successful authentication
        res.status(200).send({
            success: true,
            message: 'Login successful',
            data: data,
            token
        });

    } catch (error) {
        console.error("Error during login:", error); // Log any error
        res.status(500).send({
            success: false,
            message: 'An error occurred during login',
            error: error.message
        });
    }
}

 module.exports={ loginUser }
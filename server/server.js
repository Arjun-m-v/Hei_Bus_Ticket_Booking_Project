const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
// const { Sequelize } = require('sequelize');
// const mysql = require('mysql2');
// const bus = require('./models/BuslistModel.js'); 
// const dbConnection = require('./models/db.js');
const db = require('./models/index.js')

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// const sequelize = new Sequelize('bus', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',
// });





db.sequelize.sync().then(() => {
  console.log('Database synced successfully');
})

app.use('/bus',require('./routes/BuslistRoutes.js'))
app.use('/user',require('./routes/UserlistRoutes.js'))
app.use('/auth',require('./routes/AuthRoutes.js'))



app.listen(3001, () => {
  console.log('Server running on port 3001');
});


app.get('/test',(req,res)=>{
  res.status(200).send('<h1>Node js Mysql</h1>')
})
const PORT = process.env.PORT || 3001; 


// app.listen(PORT,() => {
//   console.log(`Server Running on port ${process.env.PORT}`);
// })
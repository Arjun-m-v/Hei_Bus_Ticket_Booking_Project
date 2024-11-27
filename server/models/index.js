const Sequelize = require('sequelize');


const sequelize = new Sequelize('bus', 'root', 'root', {
    host: 'localhost',
    dialect:'mysql'
  });

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.bus = require('./BuslistModel.js')(sequelize,Sequelize);
db.user = require('./UserlistModel.js')(sequelize,Sequelize);
db.seat = require('./SeatlistModel.js')(sequelize,Sequelize);

module.exports = db;
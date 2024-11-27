
const bus = (sequelize,Sequelize)=>{
    const bus = sequelize.define('buses',
        {
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            name:{
                type:Sequelize.STRING,
            },
            reg_no:{
                type:Sequelize.STRING,
            },
            source:{
                type:Sequelize.STRING,
            },
            destination:{
                type:Sequelize.STRING,
            },
            departure_time:{
                type:Sequelize.TIME,
            },
            arrival_time:{
                type:Sequelize.TIME,
            },
            bus_type:{
                type:Sequelize.STRING,
            },
            total_seats:{
                type:Sequelize.INTEGER,
            },
            available_seats:{
                type:Sequelize.INTEGER,
            },
        }
    );
    return bus;
};


module.exports = bus



// bus_type: Type of bus (e.g., sleeper, semi-sleeper, AC, non-AC).
// total_seats: Total number of seats available on the bus.
// available_seats: Number of available seats for booking.
// price_per_seat: The price of one seat.
// bus_operator: The company or entity operating the bus.
// status: Active/Inactive status of the bus (whether it's available for booking or not).

const booking = (sequelize,Sequelize)=>{
    const booking = sequelize.define('bookings',
        {
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                allowNull: false
            },
            busId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'buses',
                    key: 'id'
                },
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isPaid:{
                type:Sequelize.BOOLEAN,
                defaultValue: false
            },
        }
    );
    return booking;
};


module.exports = booking

const bus = (sequelize,Sequelize)=>{
    const seat = sequelize.define('seats',
        {
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            seatNumber:{
                type:Sequelize.STRING,
                allowNull: false
            },
            isAvailable:{
                type:Sequelize.BOOLEAN,
                defaultValue: true
            },
            price:{
                type:Sequelize.INTEGER,
                allowNull: false
            },
            busId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'buses',
                    key: 'id'
                },
                allowNull: false
            }
        }
    );
    return seat;
};


module.exports = bus
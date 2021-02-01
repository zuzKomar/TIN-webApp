const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Car', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len:{
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len:{
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isInt: true,

            min: {
                args:1900,
                msg: "Wartość nie mniejsza niż 1900"
            },
            max: {
                args:2000,
                msg: "Wartość nie większa niż 2000"
            }
        }
    },
    power: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isInt: true,
            min:{
                args:50,
                msg:"Wartość nie mniejsza niż 50"
            },
            max:{
                args:600,
                msg:"Wartość nie większa niż 600"
            }
        }
    },
    capacity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isDecimal:true,
            min:{
                args: 1.0,
                msg:"Wartość nie mniejsza niż 1.0"
            },
            max:{
                args:10.0,
                msg:"Wartość nie większa niż 10.0"
            },
        }
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isInt: true,

            min:{
              args:50,
              msg:"Koszt nie mniejszy niż 50 zł"
            },
            max:{
                args:400,
                msg:"Koszt nie większy niż 400 zł"
            }
        }
    }
},{
    freezeTableName: true
});

module.exports = Car;


const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const Client = require('./Client');
const Car = require('./Car');


const Rent = sequelize.define('Rent', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate:true,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            isDate: {
                msg:"Pole powinno zawierać datę w formacie yyyy-MM-dd"
            }
        }
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate: true,
        validate: {
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            isDate: {
                msg:"Pole powinno zawierać datę w formacie yyyy-MM-dd"
            },
            checkIfAfter() {
                var res = new Date(this.dateTo).getTime() < new Date(this.dateFrom).getTime();
                if(res){
                    throw new Error("Data do nie może być wcześniejsza niż data od!");
                }
            },
            chechIfTheSameAsDateFrom(){
                var res = new Date(this.dateTo).getTime() == new Date(this.dateFrom).getTime();
                if(res){
                    throw new Error("Minimalny wynajem to jedna doba")
                }
            }

        }
    },
    punishment: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate:{
            isNumber(value){
                if(value !=null && value.toString()!=='') {
                    if(isNaN(value)){
                        throw new Error('Kara musi być liczbą z przedziału 50-200');
                    }
                }
            },
            isProper(value){
                if(value !=null && value.toString()!==''){
                    if( value < 50 || value > 200){
                            throw new Error('Kara z przedziału 50-200');
                    }
                }else{
                    this.punishment=null;
                }
            },

        }
    },
    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notNull: {
                msg: "Pole jest wymagane"
            },
            checkIfClientExists(){
                return Client.findOne({
                    where:{
                        _id: this.client_id
                    }
                }).then(token =>{
                    if(token === null){
                        throw new Error("Klient o podanym id nie istnieje!")
                    }
                })
                    .catch(err=>{
                        return Promise.reject(err);
                    })
            }
        }
    },
    car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notNull: {
                msg: "Pole jest wymagane"
            },
            checkIfCarExists(){
                return Car.findOne({
                    where:{
                        _id: this.car_id
                    }
                }).then(token=>{
                    if(token === null){
                        throw new Error("Auto o podanym id nie istnieje!")
                    }
                })
                    .catch(err=>{
                        return Promise.reject(err);
                    })
            }
        }

    }
},{
        freezeTableName: true
});

module.exports = Rent;


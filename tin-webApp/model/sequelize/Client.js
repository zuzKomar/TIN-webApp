const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const authUtil = require("../../util/authUtils");

const Client = sequelize.define('Client', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [9, 14],
                msg: "Pole powinno zawierać od 9 do 14 znaków"
            },
            phoneValidator(value){
                if(value.toString()!='' && value.toString().length>8) {
                    if (!/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/i.test(value)) {
                        throw new Error("Nieprawidłowy numer telefonu");
                    }
                }
            }
        }
    },
    pesel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            checkPesel(value) {
                if(!/^[0-9]{11}$/i.test(value) && value.toString()!='') {
                    throw new Error("Pole powinno zawierać 11 cyfr");
                }
                if(/^[0-9]{11}$/i.test(value)){
                    var digits = (""+value).split("");
                    if ((parseInt(value.substring( 4, 6)) > 31)||(parseInt(value.substring( 2, 4)) > 12)||(value.substring(4,6)<='00')||(value.substring(2,4)<='00')) {
                        throw new Error("Nieprawidłowy numer pesel")
                    }else{
                        let weight = [1,3,7,9,1,3,7,9,1,3];
                        let sum = 0;
                        let controlNumber = parseInt(value.substring(10,11));

                        for(let i = 0; i< weight.length; i++){
                            sum+= (parseInt(value.substring(i,i+1))*weight[i]);
                        }
                        sum = sum % 10;
                        if((10-sum)%10!==controlNumber)
                            throw new Error("Nieprawidłowy numer pesel")
                    }


                }
            }
        }
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len: {
                agrs:[5,100],
                msg: 'Pole powinno zawierać od 5 do 100 znaków'
            },
            changePassValue(){
                this.password = authUtil.hashPassword(this.password);
            }
        }
    },
    role:{
        type: Sequelize.STRING,
        allowNull:true,
    }
},{
    freezeTableName: true
});

module.exports = Client;


const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const Car = require('../../model/sequelize/Car');
const Rent = require('../../model/sequelize/Rent');
const authUtil = require('../../util/authUtils');


module.exports = () => {
    Client.hasMany(Rent, {as: 'rents', foreignKey: {name: 'client_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Client, {as: 'client', foreignKey: {name: 'client_id', allowNull: false} } );
    Car.hasMany(Rent, {as: 'rents', foreignKey: {name: 'car_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Car, {as: 'car', foreignKey: {name: 'car_id', allowNull: false} });

    let allClients, allCars;
    return sequelize
        .sync({force: true}) //it creates the table, dropping it first if it already existed
        .then( () => {
            return Client.findAll(); //standard select
        })
        .then(clients => {
            if(!clients || clients.length == 0) {
                const passHash = authUtil.hashPassword('112233');
                const passHash2 = authUtil.hashPassword('12345');
                const passHash3 = authUtil.hashPassword('07070');
                const passHash4 = authUtil.hashPassword('lalala');
                const passHash5 = authUtil.hashPassword('alicja1');
                return Client.bulkCreate([ //add some records to database
                    {firstName: 'Mark', lastName: 'Stoyan', phone: '720777999', pesel: '97032321894', email:'mark@wp.pl', password:passHash, role:'client'},
                    {firstName: 'Kate', lastName: 'Malaya', phone: '693985305', pesel: '97010216745', email: 'kate@dow.pl', password: passHash2, role: 'emp'},
                    {firstName: 'Victoria', lastName: 'Secret', phone: '888222654', pesel: '90042627626', email: "vic.s@dow.pl", password: passHash3, role: 'emp'},
                    {firstName: 'Simon', lastName: 'Amman', phone: '605567856', pesel: '96050384298', email: "szym@wp.pl", password: passHash4, role: 'client'},
                    {firstName: 'Alice', lastName: 'Polloc', phone: '608756495', pesel: '75052823624', email: "ala@wp.pl", password: passHash4, role: 'client'}
                ])
                    .then(() => {
                        return Client.findAll();
                    });
            }else{
                return clients;
            }
        })
        .then(clients =>{
            allClients = clients;
            return Car.findAll();
        })
        .then(cars =>{
            if(!cars || cars.length == 0){
                return Car.bulkCreate([
                    {brand: 'Ford', model: 'Mustang', year:1970, power:400, capacity:4.5, cost:300},
                    {brand: 'Chevrolet', model: 'Corvette C4', year: 1984, power: 350, capacity: 4.0, cost: 300},
                    {brand: 'Pontiac', model: 'Firebird', year: 1978, power: 350, capacity: 5.0, cost: 300},
                    {brand: 'Dodge', model: 'Coronet', year: 1969, power:250, capacity: 5.2, cost: 150},
                    {brand: 'Ford', model: 'GT40', year: 1969, power:355, capacity: 4.2, cost: 280}
                ])
                    .then(()=>{
                        return Client.findAll();
                    });
                }else{
                return cars;
            }
        })
        .then(cars =>{
            allCars = cars;
            return Rent.findAll();
        })
        .then(rents =>{
            if(!rents || rents.length == 0){
                return Rent.bulkCreate([
                    {client_id: allClients[0]._id, car_id: allCars[0]._id, dateFrom: '2020-05-06',dateTo:'2020-05-08', punishment:100},
                    {client_id: allClients[0]._id, car_id: allCars[2]._id, dateFrom: '2020-10-14', dateTo: '2020-10-15',punishment:50},
                    {client_id: allClients[3]._id, car_id: allCars[1]._id, dateFrom: '2020-07-07', dateTo: '2020-07-08',punishment:50},
                    {client_id: allClients[3]._id, car_id: allCars[3]._id, dateFrom: '2020-08-15', dateTo: '2020-08-17'}
                ]);
            }else{
                return rents;
            }
        });
};
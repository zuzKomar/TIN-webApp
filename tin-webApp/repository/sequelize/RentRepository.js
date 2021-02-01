const Sequelize = require('sequelize');

const Rent = require('../../model/sequelize/Rent');
const Client = require('../../model/sequelize/Client');
const Car = require('../../model/sequelize/Car');

exports.getRents = () =>{
    return Rent.findAll({include:[
            {
                model: Client,
                as: 'client'
            },
            {
                model:Car,
                as: 'car'
            }]
    });
};

exports.getClientRents = (clientId) =>{
    return Rent.findAll({
        where : {client_id : clientId},
        include:[
            {
                model: Client,
                as: 'client'
            },
            {
                model: Car,
                as: 'car'
            }
        ]
    });
}

exports.getCarRents = (carId) =>{
    return Rent.findAll({
        where: {car_id : carId},
        include:[
            {
                model: Client,
                as: 'client'
            },
            {
                model:Car,
                as : 'car'
            }
        ]
    });
}


exports.getRentById = (rentId) =>{

    return Rent.findByPk(rentId,
        {include: [
            {
                model: Client,
                as: 'client'
            },
            {
                model:Car,
                as: 'car'
            }]
    });
};


exports.createRent = (data) =>{
    // console.log(JSON.stringify(data));      //converts JavaSpring obj or value to JSON

    return Rent.create({
        client_id: data.client_id,
        car_id: data.car_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        payment: data.payment,
        punishment: (data.punishment==null || data.punishment=='') ? null : data.punishment
    });
};

exports.updateRent = (rentId, data) =>{
    const client_id = data.client_id;
    const car_id = data.car_id;
    const dateFrom = data.dateFrom;
    const dateTo = data.dateTo;
    const punishment = (data.punishment==null || data.punishment.toString()==='') ? null : data.punishment;
    return Rent.update(data, {where: {_id: rentId}});
}

exports.deleteRent = (rentId) =>{
    return Rent.destroy({
        where: {_id:rentId}
    });
}


exports.deleteManyRents = (rentIds) =>{
    return Rent.find({_id:{[Sequelize.Op.in]:rentIds}})
}
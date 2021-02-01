const Car = require("../../model/sequelize/Car");
const Rent = require("../../model/sequelize/Rent");
const Client = require("../../model/sequelize/Client");

exports.getCars = () =>{
    return Car.findAll();
};

exports.getCarById= (carId) =>{
    return Car.findByPk(carId,
        {
            include: [{
                model:Rent,
                as: 'rents',
                include: [{
                    model: Client,
                    as:'client'
                }]
            }]
    });
};

exports.createCar = (newCarData) =>{
    return Car.create({
        brand: newCarData.brand,
        model: newCarData.model,
        year:newCarData.year,
        power: newCarData.power,
        capacity:newCarData.capacity,
        cost: newCarData.cost
    });
};

exports.updateCar = (carId, carData) =>{
    const brand = carData.brand;
    const model = carData.model;
    const year = carData.year;
    const power = carData.power;
    const capacity = carData.capacity;
    const cost = carData.cost;
    return Car.update(carData, {where: {_id:carId}});
};

exports.deleteCar = (carId) =>{
    return Car.destroy({
        where: {_id: carId}
    });
};
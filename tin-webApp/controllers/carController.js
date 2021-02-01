const CarRepository = require('../repository/sequelize/CarRepository');


exports.showCarList = (req, res, next) => {
    CarRepository.getCars()
        .then(cars =>{
            res.render('pages/car/list',{
                cars: cars,
                navLocation: 'car'
            });
        });
}


exports.showAddCarForm = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        res.render('pages/car/form', {
            car: {},
            pageTitle: 'Nowe auto',
            formMode: 'createNew',
            btnLabel: 'Dodaj auto',
            formAction: '/cars/add',
            navLocation: 'car'
        });
    }
}


exports.showCarDetails = (req, res, next) => {
        const carId = req.params.carId;
        CarRepository.getCarById(carId)
            .then(car => {
                res.render('pages/car/form', {
                    car: car,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły auta',
                    formAction: '',
                    navLocation: 'car'
                });
            })
            .then(

            );

}

exports.showCarEditForm = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        const carId = req.params.carId;
        CarRepository.getCarById(carId)
            .then(car => {
                res.render('pages/car/form', {
                    car: car,
                    formMode: 'edit',
                    pageTitle: 'Edycja auta',
                    btnLabel: 'Edytuj auto',
                    formAction: '/cars/edit',
                    navLocation: 'car'
                });
            });
    }
};

exports.addCar = (req,res,next) =>{
    const carData={...req.body};
    CarRepository.createCar(carData)
        .then(result =>{
            res.redirect('/cars');
        })
        .catch(err=>{
            res.render('pages/car/form',{
                car:carData,
                pageTitle: 'Nowe auto',
                formMode: 'createNew',
                btnLabel:'Dodaj auto',
                formAction: '/cars/add',
                navLocation: 'car',
                validationErrors: err.errors
            });
    });
};

exports.updateCar = (req,res,next) =>{
    const carId = req.body._id;
    const carData = {...req.body};
    CarRepository.updateCar(carId, carData)
        .then(result =>{
            res.redirect('/cars');
        })
        .catch(err=>{
            res.render('pages/car/form',{
                car:carData,
                pageTitle: 'Edycja auta',
                formMode: 'edit',
                btnLabel: 'Edytuj auto',
                formAction: '/cars/edit',
                navLocation: 'car',
                validationErrors: err.errors
            });
    });
};

exports.deleteCar = (req,res,next) =>{
    const carId=req.params.carId;
    CarRepository.deleteCar(carId)
        .then( ()=>{
            res.redirect('/cars');
        });
};




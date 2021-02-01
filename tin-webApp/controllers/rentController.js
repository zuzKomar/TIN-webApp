const RentRepository = require('../repository/sequelize/RentRepository');
const ClientRepository = require('../repository/sequelize/ClientRepository');
const CarRepository = require('../repository/sequelize/CarRepository');

exports.showRentList = (req, res, next) => {
    if (req.session.loggedUser.role === 'emp'){
    RentRepository.getRents()
        .then(rents =>{
            res.render('pages/rent/list',{
                rents: rents,
                navLocation: 'rent'
            });
        });
    }else{
        const clientId = req.session.loggedUser._id;
        RentRepository.getClientRents(clientId)
            .then(rents =>{
                res.render('pages/rent/list',{
                    rents:rents,
                    navLocation: 'rent'
                });
            });
    }
}


exports.showAddRentForm = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        let allClients, allCars;
        ClientRepository.getClients()
            .then(clients => {
                allClients = clients;
                return CarRepository.getCars();
            })
            .then(cars => {
                allCars = cars;
                res.render('pages/rent/form', {
                    rent: {},
                    formMode: 'createNew',
                    allClients: allClients,
                    allCars: allCars,
                    pageTitle: 'Nowe wypożyczenie',
                    btnLabel: 'Dodaj wypożyczenie',
                    formAction: '/rents/add',
                    navLocation: 'rent'
                });
            });
    }
}


exports.showRentDetails = (req, res, next) => {
    let allClients, allCars;
    const rentId = req.params.rentId;

    ClientRepository.getClients()
        .then(clients =>{
        allClients = clients;
        return CarRepository.getCars();
         })
        .then(cars => {
            allCars = cars;
          return RentRepository.getRentById(rentId)
        })
        .then(rent =>{
            res.render('pages/rent/form', {
                rent: rent,
                formMode: 'showDetails',
                allClients : allClients,
                allCars: allCars,
                pageTitle: 'Szczegóły wypożyczenia',
                formAction: '',
                navLocation: 'rent'
        });
    });
}

exports.showRentEditForm = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        let allClients, allCars;
        const rentId = req.params.rentId;

        ClientRepository.getClients()
            .then(clients => {
                allClients = clients;
                return CarRepository.getCars();
            })
            .then(cars => {
                allCars = cars;
                return RentRepository.getRentById(rentId)
            })
            .then(rent => {
                res.render('pages/rent/form', {
                    rent: rent,
                    formMode: 'edit',
                    pageTitle: 'Edycja wypożyczenia',
                    btnLabel: 'Edytuj wypożyczenie',
                    allClients: allClients,
                    allCars: allCars,
                    formAction: '/rents/edit',
                    navLocation: 'rent'
                });
            });
    }
}

exports.addRent = (req,res,next) =>{
    let allClients, allCars;
    const rentData = {...req.body};
    RentRepository.createRent(rentData)
        .then(result=>{
            res.redirect('/rents');
        })
        .catch(err=>{
            ClientRepository.getClients()
                .then(clients =>{
                    allClients = clients;
                    return CarRepository.getCars();
                })
                .then(cars=>{
                    allCars = cars;
                    res.render('pages/rent/form',{
                        rent: rentData,
                        pageTitle: 'Nowe wypożyczenie',
                        formMode: 'createNew',
                        btnLabel: 'Dodaj wypożyczenie',
                        allClients : allClients,
                        allCars: allCars,
                        formAction: '/rents/add',
                        navLocation: 'rent',
                        validationErrors: err.errors
                    });
                });
        });
}

exports.updateRent = (req,res,next) =>{
    let allClients, allCars;
    const rentId = req.body._id;
    const rentData = {...req.body};
    RentRepository.updateRent(rentId, rentData)
        .then(result =>{
            res.redirect('/rents');
        })
        .catch(err=>{
            ClientRepository.getClients()
                .then(clients =>{
                    allClients = clients;
                    return CarRepository.getCars();
                })
                .then(cars=> {
                    allCars = cars;
                    return RentRepository.getRentById(rentId)
                })
                .then(rent=>{
                    res.render('pages/rent/form',{
                        rent: rent,
                        pageTitle: 'Edycja wypożyczenia',
                        formMode: 'edit',
                        btnLabel: 'Edytuj wypożyczenie',
                        allClients : allClients,
                        allCars: allCars,
                        formAction: '/rents/edit',
                        navLocation: 'rent',
                        validationErrors: err.errors
                     });
                });
            });
};

exports.deleteRent = (req,res,next) =>{
    if(req.session.loggedUser.role === 'emp') {
        const rentId = req.params.rentId;
        RentRepository.deleteRent(rentId)
            .then(() => {
                res.redirect('/rents');
            });
    }else
        res.toString("Nie masz uprawnien")
};
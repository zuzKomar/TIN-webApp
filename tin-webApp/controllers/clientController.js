const ClientRepository = require('../repository/sequelize/ClientRepository');


exports.showClientList = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        ClientRepository.getClients()
            .then(clients => {
                res.render('pages/client/list', {
                    clients: clients,
                    navLocation: 'clientt'
                });
            });
    }
}

exports.showAddClientForm = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        res.render('pages/client/form', {
            clientt: {},
            pageTitle: 'Nowy klient',
            formMode: 'createNew',
            btnLabel: 'Dodaj klienta',
            formAction: '/clients/add',
            navLocation: 'clientt'
        });
    }
}


exports.showClientDetails = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        const clientId = req.params.clientId;
        ClientRepository.getClientById(clientId)
            .then(clientt => {
                res.render('pages/client/form', {
                    clientt: clientt,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły klienta',
                    formAction: '',
                    navLocation: 'clientt'
                });
            });
    }
}

exports.showClientEditForm = (req, res, next) => {
    if(req.session.loggedUser.role === 'emp') {
        const clientId = req.params.clientId;
        ClientRepository.getClientById(clientId)
            .then(clientt => {
                res.render('pages/client/form', {
                    clientt: clientt,
                    formMode: 'edit',
                    pageTitle: 'Edycja klienta',
                    btnLabel: 'Edytuj klienta',
                    formAction: '/clients/edit',
                    navLocation: 'clientt'
                });
            });
    }
};

exports.addClient = async (req, res, next) => {
    const clientData = {...req.body};
    let pswd = clientData.password;
    ClientRepository.createClient(clientData)
        .then(result => {
            res.redirect('/clients');
        })
        .catch(err => {
            clientData.password=pswd;
            err.errors.forEach(e => {
                if (e.path.includes('pesel') && e.type == 'unique violation') {
                    e.message = req.__('validationMessage.peselExists');
                } else if (e.path.includes('email') && e.type == 'unique violation') {
                    e.message = req.__('validationMessage.emailExists');
                }
            });
            res.render('pages/client/form', {
                clientt: clientData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/clients/add',
                navLocation: 'clientt',
                validationErrors: err.errors
            });
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = {...req.body};
    let pswd = clientData.password;
    ClientRepository.updateClient(clientId,clientData)
        .then(result =>{
           res.redirect('/clients');
        })
        .catch(err=>{
            clientData.password=pswd;
        err.errors.forEach(e => {
                if(e.path.includes('pesel') && e.type == 'unique violation') {
                    e.message = req.__('validationMessage.peselExists');
                }else if(e.path.includes('email') && e.type == 'unique violation') {
                    e.message = req.__('validationMessage.emailExists');
                }
            });
            res.render('pages/client/form',{
                clientt: clientData,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/clients/edit',
                navLocation: 'clientt',
                validationErrors: err.errors
            });
        });
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then(()=>{
           res.redirect('/clients');
        });
};


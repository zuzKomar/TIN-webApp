const Client = require("../../model/sequelize/Client");
const Car = require("../../model/sequelize/Car");
const Rent = require("../../model/sequelize/Rent");


exports.getClients = () =>{
    return Client.findAll();
};

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId,{
        include: [{
            model: Rent,
            as: 'rents',
            include: [{
                model: Car,
                as: 'car'
            }]
        }]
    });
};


exports.createClient = (newClientData) =>{
    return Client.create({
        firstName: newClientData.firstName,
        lastName: newClientData.lastName,
        phone: newClientData.phone,
        pesel: newClientData.pesel,
        email: newClientData.email,
        password: newClientData.password,
        role: (newClientData.role == null || newClientData.role=='') ? 'client' : 'client'
    });
};

exports.updateClient = (clientId, clientData) =>{ //działa
    const firstName = clientData.firstName;
    const lastName = clientData.lastName;
    const phone = clientData.phone;
    const pesel = clientData.pesel;
    const email = clientData.email;
    const password = clientData.password;
    return Client.update(clientData, {where: {_id:clientId}});
};

exports.deleteClient = (clientId) =>{ //działa
    return Client.destroy({
        where: {_id: clientId}
    });
};

exports.findByEmail = (email) => { //działa
    return Client.findOne({
        where: {email: email}
    });
}


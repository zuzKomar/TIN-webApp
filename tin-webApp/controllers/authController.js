const ClientRepository = require('../repository/sequelize/ClientRepository');
const authUtil = require("../util/authUtils");


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    ClientRepository.findByEmail(email)
        .then(clnt => {
            if(!clnt) {
                res.render('login', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginError')
                })
            } else if(authUtil.comparePasswords(password, clnt.password) === true) {
                req.session.loggedUser = clnt;
                res.redirect('/');
            } else {
                res.render('login', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginError')
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

exports.showLoginForm = (req, res, next) =>{
    res.render('login');
}
exports.showRegisterForm = (req,res,next) =>{
    res.render('register',{
        clientt: {},
        pageTitle: 'Rejestracja',
        formMode: 'createNew',
        btnLabel: 'Zarejestruj',
        formAction: '/register',
        navLocation: 'clientt'
    });
}

exports.registerNewUser = (req,res,next)=>{
    const userData = {...req.body};
    let password = userData.password;
    ClientRepository.createClient(userData)
        .then(result =>{
            req.session.loggedUser=result;
            res.redirect('/');
        }).catch(err=>{
            userData.password=password;
        err.errors.forEach(e => {
            if(e.path.includes('pesel') && e.type == 'unique violation') {
                e.message = req.__('validationMessage.peselExists');
            }else if(e.path.includes('email') && e.type == 'unique violation') {
                e.message = req.__('validationMessage.emailExists');
            }
        });
        res.render('register',{
            clientt: userData,
            pageTitle: 'Rejestracja',
            formMode: 'createNew',
            btnLabel: 'Zarejestruj',
            formAction: '/register',
            navLocation: 'clientt',
            validationErrors: err.errors
        });
    });
};
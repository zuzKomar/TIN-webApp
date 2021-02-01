var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/LangController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { navLocation: 'main'
      });
});

router.get('/login', AuthController.showLoginForm);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/register', AuthController.showRegisterForm);
router.post('/register',AuthController.registerNewUser);
router.get('/changeLang/:lang', LangController.changeLang);

module.exports = router;


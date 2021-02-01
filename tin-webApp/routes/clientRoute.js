const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/',clientController.showClientList);
router.get('/add',clientController.showAddClientForm);
router.get('/details/:clientId', clientController.showClientDetails);
router.get('/edit/:clientId', clientController.showClientEditForm);
router.post('/add', clientController.addClient);
router.post('/edit', clientController.updateClient);
router.get('/delete/:clientId', clientController.deleteClient);


module.exports = router;
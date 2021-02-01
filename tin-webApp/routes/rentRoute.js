const express = require('express');
const router = express.Router();

const rentController = require('../controllers/rentController');

router.get('/',rentController.showRentList);
router.get('/add', rentController.showAddRentForm);
router.get('/details/:rentId',rentController.showRentDetails);
router.get('/edit/:rentId',rentController.showRentEditForm);
router.post('/add', rentController.addRent);
router.post('/edit', rentController.updateRent);
router.get('/delete/:rentId', rentController.deleteRent);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController  = require('../controllers/userController')

router.get('/menu', userController.viewMenu);
router.post('/order', userController.createOrder);

module.exports = router;
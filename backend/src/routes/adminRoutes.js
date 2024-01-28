const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.post('/menu', authMiddleware, authorizeAdmin, adminController.addMenuItem);
router.put('/menu/:id', authMiddleware, authorizeAdmin, adminController.updateMenuItem);
router.delete('/menu/:id', authMiddleware, authorizeAdmin, adminController.deleteMenuItem);

module.exports = router;
const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employeeController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, employeeController.getEmployees);

router.get('/export', verifyToken, employeeController.exportEmployees);

router.get('/:id', verifyToken, employeeController.getEmployeeById);

router.post('/', verifyToken, employeeController.addEmployee);

router.put('/:id', verifyToken, employeeController.updateEmployee);

router.delete('/:id', verifyToken, employeeController.deleteEmployee);

module.exports = router;
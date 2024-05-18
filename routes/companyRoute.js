const express = require("express");
const router = express.Router();
const companyController = require('../controllers/companyController');
const validator = require('../middleware/validationMiddleware')
const auth = require('../middleware/authenticate');

router.get('/', auth.authenticateToken('ADMIN'), companyController.getCompanies);
router.post('/', auth.authenticateToken('COMPANY'), validator('addCompany'), companyController.createCompany);
router.post('/addCompany', auth.authenticateToken('ADMIN'), companyController.addCompany);
router.get('/getCompany/:id', auth.authenticateToken('ADMIN'), companyController.getCompany)
router.put('/updateCompany/:id', auth.authenticateToken('ADMIN'), validator('addCompany'), companyController.updateCompany)
router.post('/updateOwnCompany', auth.authenticateToken('COMPANY'), validator('addCompany'), companyController.updateOwnCompany)
router.delete('/deleteCompany/:id', auth.authenticateToken('ADMIN'), companyController.deleteCompany)

module.exports = router;

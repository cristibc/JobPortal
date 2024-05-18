const express = require("express");
const router = express.Router();
const companyController = require('../controllers/companyController');
const validator = require('../middleware/validationMiddleware')

router.get('/', companyController.getCompanies);
router.post('/', validator('addCompany'), companyController.createCompany);
router.get('/:id', companyController.getCompany)
router.put('/:id', validator('addCompany'), companyController.updateCompany)
router.delete('/:id', companyController.deleteCompany)

module.exports = router;

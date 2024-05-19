const express = require("express");
const router = express.Router();
const companyController = require('../controllers/companyController');
const validator = require('../middleware/validationMiddleware')
const auth = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of companies
 */
router.get('/', auth.authenticateToken('ADMIN'), companyController.getCompanies);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company created
 */
router.post('/', auth.authenticateToken('COMPANY'), validator('addCompany'), companyController.createCompany);

/**
 * @swagger
 * /api/companies/addCompany:
 *   post:
 *     summary: Add a new company by admin
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               createdById:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company added
 */
router.post('/addCompany', auth.authenticateToken('ADMIN'), companyController.addCompany);

/**
 * @swagger
 * /api/companies/getCompany/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     responses:
 *       200:
 *         description: Company data
 *       404:
 *         description: Company not found
 */
router.get('/getCompany/:id', auth.authenticateToken('ADMIN'), companyController.getCompany);

/**
 * @swagger
 * /api/companies/updateCompany/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated
 *       404:
 *         description: Company not found
 */
router.put('/updateCompany/:id', auth.authenticateToken('ADMIN'), validator('addCompany'), companyController.updateCompany);

/**
 * @swagger
 * /api/companies/updateOwnCompany:
 *   post:
 *     summary: Update own company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated
 *       404:
 *         description: Company not found
 */
router.post('/updateOwnCompany', auth.authenticateToken('COMPANY'), validator('addCompany'), companyController.updateOwnCompany);

/**
 * @swagger
 * /api/companies/deleteCompany/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     responses:
 *       200:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 */
router.delete('/deleteCompany/:id', auth.authenticateToken('ADMIN'), companyController.deleteCompany);

module.exports = router;

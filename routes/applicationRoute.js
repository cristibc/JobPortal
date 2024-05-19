const express = require("express");
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Application management
 */

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Retrieve a list of applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of applications
 *       403:
 *         description: Unauthorized
 */
router.get('/', auth.authenticateToken('ADMIN'), applicationController.getApplications); 

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create a new application as Admin
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application created
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth.authenticateToken('ADMIN'), applicationController.createApplication);

/**
 * @swagger
 * /api/applications/applyAsUser:
 *   post:
 *     summary: Apply as a user
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted
 *       401:
 *         description: Unauthorized
 */
router.post('/applyAsUser', auth.authenticateToken('USER'), applicationController.applyAsUser);

/**
 * @swagger
 * /api/applications/getApplication/{id}:
 *   get:
 *     summary: Retrieve an application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.get('/getApplication/:id', auth.authenticateToken('ADMIN'), applicationController.getApplication);

/**
 * @swagger
 * /api/applications/getOwnApplications:
 *   get:
 *     summary: Retrieve the authenticated user's applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of applications
 *       401:
 *         description: Unauthorized
 */
router.get('/getOwnApplications', auth.authenticateToken('USER'), applicationController.getOwnApplications);

/**
 * @swagger
 * /api/applications/updateApplication/{id}:
 *   put:
 *     summary: Update an application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.put('/updateApplication/:id', auth.authenticateToken('ADMIN'), applicationController.updateApplication);

/**
 * @swagger
 * /api/applications/deleteApplication/{id}:
 *   delete:
 *     summary: Delete an application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Application ID
 *     responses:
 *       204:
 *         description: Application deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.delete('/deleteApplication/:id', auth.authenticateToken('ADMIN'), applicationController.deleteApplication);

/**
 * @swagger
 * /api/applications/deleteOwnApplication/{id}:
 *   delete:
 *     summary: Delete logged in user's own application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Application ID
 *     responses:
 *       204:
 *         description: Application deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.delete('/deleteOwnApplication/:id', auth.authenticateToken('USER'), applicationController.deleteOwnApplication);

/**
 * @swagger
 * /api/applications/getApplicationsForJobPost/{id}:
 *   get:
 *     summary: Retrieve applications for a specific job post
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job post ID
 *     responses:
 *       200:
 *         description: A list of applications
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job post not found
 */
router.get('/getApplicationsForJobPost/:id', auth.authenticateToken('ADMIN'), applicationController.getApplicationsForJobPost);

/**
 * @swagger
 * /api/applications/acceptApplicationsForJobPost:
 *   post:
 *     summary: Accept applications for a job post
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acceptedUsers:
 *                 type: array
 *                 items:
 *                      type: string
 *                      example: userId1, userId2
 *               jobPostId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Applications accepted
 *       401:
 *         description: Unauthorized
 */
router.post('/acceptApplicationsForJobPost', auth.authenticateToken('COMPANY'), applicationController.acceptApplicationsForJobPost);

/**
 * @swagger
 * /api/applications/getPage/{page}/{countPerPage}:
 *   get:
 *     summary: Retrieve applications by page and number of results per page
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: Page number
 *       - in: path
 *         name: countPerPage
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: Number of applications per page
 *     responses:
 *       200:
 *         description: A list of applications
 *       403:
 *         description: Unauthorized
 */
router.get('/getPage/:page/:countPerPage', auth.authenticateToken(['ADMIN']), applicationController.getApplicationsByPageAndCount);

module.exports = router;

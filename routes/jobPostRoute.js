const express = require("express");
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');
const auth = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: JobPosts
 *   description: Job post management
 */

/**
 * @swagger
 * /api/jobPosts:
 *   get:
 *     summary: Get all job posts
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of job posts
 */
router.get('/', auth.authenticateToken(), jobPostController.getJobPosts);

/**
 * @swagger
 * /api/jobPosts:
 *   post:
 *     summary: Create a new job post
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *               experience:
 *                 type: string
 *               type:
 *                 type: string
 *               companyName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job post created
 */
router.post('/', auth.authenticateToken('ADMIN'), jobPostController.createJobPost);

/**
 * @swagger
 * /api/jobPosts/addOwnJobPost:
 *   post:
 *     summary: Add a job post as a company
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *               experience:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job post added
 */
router.post('/addOwnJobPost', auth.authenticateToken('COMPANY'), jobPostController.addOwnJobPost);

/**
 * @swagger
 * /api/jobPosts/getJobPost/{id}:
 *   get:
 *     summary: Get a job post by ID
 *     tags: [JobPosts]
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
 *         description: Job post data
 *       404:
 *         description: Job post not found
 */
router.get('/getJobPost/:id', auth.authenticateToken(), jobPostController.getJobPost);

/**
 * @swagger
 * /api/jobPosts/updateJobPost/{id}:
 *   put:
 *     summary: Update a job post
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *               experience:
 *                 type: string
 *               type:
 *                 type: string
 *               company:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job post updated
 *       404:
 *         description: Job post not found
 */
router.put('/updateJobPost/:id', auth.authenticateToken(['ADMIN', 'COMPANY']), jobPostController.updateJobPost);

/**
 * @swagger
 * /api/jobPosts/updateOwnJobPost/{id}:
 *   put:
 *     summary: Update own job post
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *               experience:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job post updated
 *       404:
 *         description: Job post not found
 */
router.put('/updateOwnJobPost/:id', auth.authenticateToken('COMPANY'), jobPostController.updateOwnJobPost);

/**
 * @swagger
 * /api/jobPosts/deleteJobPost/{id}:
 *   delete:
 *     summary: Delete a job post
 *     tags: [JobPosts]
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
 *         description: Job post deleted
 *       404:
 *         description: Job post not found
 */
router.delete('/deleteJobPost/:id', auth.authenticateToken('ADMIN'), jobPostController.deleteJobPost);

/**
 * @swagger
 * /api/jobPosts/deleteOwnJobPost/{id}:
 *   delete:
 *     summary: Delete own job post
 *     tags: [JobPosts]
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
 *         description: Job post deleted
 *       404:
 *         description: Job post not found
 */
router.delete('/deleteOwnJobPost/:id', auth.authenticateToken('COMPANY'), jobPostController.deleteOwnJobPost);

/**
 * @swagger
 * /api/jobPosts/getJobPostsMatching:
 *   post:
 *     summary: Get job posts matching criteria
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               company:
 *                 type: string
 *               experience:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Matching job posts
 */
router.post('/getJobPostsMatching', auth.authenticateToken(), jobPostController.getJobPostsMatching);

/**
 * @swagger
 * /api/jobPosts/getJobPostsMatchingWithMinimumSalary:
 *   post:
 *     summary: Get job posts matching criteria with minimum salary
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               company:
 *                 type: string
 *               experience:
 *                 type: string
 *               type:
 *                 type: string
 *               minimumSalary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Matching job posts
 */
router.post('/getJobPostsMatchingWithMinimumSalary', auth.authenticateToken(), jobPostController.getJobPostsMatchingWithMinimumSalary);

/**
 * @swagger
 * /api/jobPosts/sortJobPostsBySalary:
 *   post:
 *     summary: Sort job posts by salary
 *     tags: [JobPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minimumSalary:
 *                 type: number
 *               order:
 *                 type: string
 *                 enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Sorted job posts
 */
router.post('/sortJobPostsBySalary', auth.authenticateToken(), jobPostController.sortJobPostsBySalary);

module.exports = router;

const express = require("express");
const userController = require('../controllers/userController');
const auth = require('../middleware/authenticate');
const validator = require('../middleware/validationMiddleware');
const multer  = require('multer');
const upload = multer({ dest: 'public/user-images' });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * '/api/register':
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               email:
 *                 type: string
 *                 example: email@email.com
 *               password:
 *                 type: string
 *                 example: password
 *               role:
 *                 type: string
 *                 enum: [ "USER", "COMPANY"]
 *                 example: USER
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Validation error
 */
router.post("/register", validator('register'), userController.register);

/**
 * @swagger
 * '/api/login':
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Unauthorized
 */
router.post("/login", validator('login'), userController.login);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out
 */
router.get("/logout", userController.logout);

/**
 * @swagger
 * /api/refreshToken:
 *   get:
 *     summary: Refresh the authentication token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Unauthorized
 */
router.get('/refreshToken', auth.authenticateToken(['ADMIN', 'USER', 'COMPANY']), userController.refreshToken);

/**
 * @swagger
 * /api/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           required:
 *              - username
 *              - email
 *              - password
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               email:
 *                 type: string
 *                 example: email@email.com
 *               password:
 *                 type: string
 *                 example: password
 *               image:
 *                 type: string
 *                 format: binary
 *               cv:
 *                 type: string
 *                 format: binary
 *               role:
 *                 type: string
 *                 enum: [ "USER", "COMPANY", "ADMIN"]
 *                 example: USER       
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         description: Unauthorized
 */
router.post('/createUser', auth.authenticateToken(), userController.createUser);

/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 */
router.get('/getUsers', auth.authenticateToken('ADMIN'), userController.getUsers);

/**
 * @swagger
 * /api/getUser/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/getUser/:id', auth.authenticateToken('ADMIN'), userController.getUser);

/**
 * @swagger
 * /api/updateUser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               email:
 *                 type: string
 *                 example: email@email.com
 *               password:
 *                 type: string
 *                 example: password
 *               image:
 *                 type: string
 *                 format: binary
 *               cv:
 *                 type: string
 *                 format: binary
 *               role:
 *                 type: string
 *                 enum: [ "USER", "COMPANY", "ADMIN"]
 *                 example: USER       
 *     responses:
 *       200:
 *         description: User updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/updateUser/:id', auth.authenticateToken('ADMIN'), validator('updateUser'), userController.updateUser);

/**
 * @swagger
 * /api/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/deleteUser/:id', auth.authenticateToken('ADMIN'), userController.deleteUser);

/**
 * @swagger
 * /api/addImageOrCv:
 *   put:
 *     summary: Add or update user's image or CV
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image or CV added/updated
 *       401:
 *         description: Unauthorized
 */
router.put('/addImageOrCv', upload.fields([{ name: 'image', maxCount: 1}, {name: 'cv', maxCount: 1}]), auth.authenticateToken(['USER', 'ADMIN']), userController.addImageOrCv);

module.exports = router;

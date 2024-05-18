const express = require("express")
const userController = require('../controllers/userController');
const auth = require('../middleware/authenticate');
const validator = require('../middleware/validationMiddleware')
const multer  = require('multer');
const upload = multer({ dest: 'public/user-images' })

const router = express.Router();

router.post("/register", validator('register'), userController.register);
router.post("/login", validator('login'), userController.login);
router.get("/logout", userController.logout)
router.get('/refreshToken', auth.authenticateToken(['ADMIN', 'USER', 'COMPANY']), userController.refreshToken);
router.post('/createUser', auth.authenticateToken(), userController.createUser);
router.get('/getUsers', auth.authenticateToken('ADMIN'), userController.getUsers);
router.get('/getUser/:id', auth.authenticateToken('ADMIN'), userController.getUser);
router.put('/updateUser/:id', auth.authenticateToken('ADMIN'), validator('updateUser'), userController.updateUser);
router.delete('/deleteUser/:id', auth.authenticateToken('ADMIN'), userController.deleteUser);
router.put('/addImageOrCv', upload.fields([{ name: 'image', maxCount: 1}, {name: 'cv', maxCount: 1}]), auth.authenticateToken('USER', 'ADMIN'), userController.addImageOrCv);


module.exports = router;

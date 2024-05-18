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
router.post('/refreshToken', userController.refreshToken);
router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getUsers);
router.get('/getUser/:id', userController.getUser);
router.put('/updateUser/:id', validator('updateUser'), userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/addImageOrCv/:id', upload.fields([{ name: 'image', maxCount: 1}, {name: 'cv', maxCount: 1}]), userController.addImageOrCv);


module.exports = router;

//  upload.fields([{ name: 'image', maxCount: 1}, {name: 'cv', maxCount: 1}]),

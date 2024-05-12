const express = require("express")
const userController = require('../controllers/userController');
const auth = require('../middleware/authenticate');

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout)
router.post('/refreshToken', userController.refreshToken);
router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getUsers);
router.get('/getUser/:id', userController.getUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;

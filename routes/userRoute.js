const express = require("express")
const userController = require('../controllers/userController');
const auth = require('../middleware/authenticate');

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout)
router.post('/refreshToken', userController.refreshToken);

module.exports = router;

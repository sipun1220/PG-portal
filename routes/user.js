const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');


router.route('/signup')
	.get(userController.signupForm)
	.post(userController.signup);

router.route('/login')
	.get(userController.loginForm)
	.post(userController.login);

router.get('/auth/callback', userController.authCallback);
router.get('/logout', userController.logout);

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/users.js');


router.route("/signup")
.get( userController.signupForm)
.post( wrapAsync(userController.signup));
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { requireAuth } = require('../middleware/auth.js');
const grievanceController = require('../controllers/grievance.js');
const parseForm = multer().any();

router.get('/show', requireAuth, grievanceController.showMyGrievances);
router.post('/submit-grievance', requireAuth, parseForm, grievanceController.createGrievance);

module.exports = router;
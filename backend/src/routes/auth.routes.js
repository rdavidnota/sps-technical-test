const express = require('express');
const router = express.Router();
const {authController}= require('./dependencies.routes');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/auth/login', authController.login);

module.exports = router;

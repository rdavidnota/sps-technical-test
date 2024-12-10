const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {userController} = require('./dependencies.routes')

router.get('/user', authMiddleware, userController.getUsers);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.post('/user', authMiddleware, userController.createUser);
router.post('/user/:id', authMiddleware, userController.updateUser);
router.delete('/user/:id', authMiddleware, userController.deleteUser);


module.exports = router;

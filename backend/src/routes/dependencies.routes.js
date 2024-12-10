const UserController = require('../controllers/user.controller');
const UserService = require('../services/user.service');
const MemoryUserRepository = require('../repositories/memory/memory.user.repository');
const AuthController = require('../controllers/auth.controller');
const AuthService = require('../services/auth.service');

const userRepository = new MemoryUserRepository();

const userService = new UserService(userRepository);
const authService = new AuthService(userService);

const userController = new UserController(userService);
const authController = new AuthController(authService);

module.exports = { userRepository, userService, userController, authService, authController}
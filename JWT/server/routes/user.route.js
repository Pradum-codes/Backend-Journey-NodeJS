const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller.js');
const auth = require('../middlewares/auth.middleware.js');

route.post('/register', userController.register);
route.post('/login', userController.login);
route.get('/profile', auth, userController.profile);

module.exports = route;
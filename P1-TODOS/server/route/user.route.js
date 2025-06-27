const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

router.get('/get', userController.getUsers);
router.post('/create', userController.createUser);

module.exports = router;

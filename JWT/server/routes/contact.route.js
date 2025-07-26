const express = require('express');
const route = express.Router();
const auth = require('../middlewares/auth.middleware')
const controller = require('../controllers/contacts.controller');

route.get('/get', auth, controller.getAllContacts);
route.post('/create', auth, controller.createContacts);

module.exports = route;
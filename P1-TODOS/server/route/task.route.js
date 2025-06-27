const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');

router.get('/get', taskController.getTasksForUser);
router.post('/create', taskController.createTaskForUser);

module.exports = router;

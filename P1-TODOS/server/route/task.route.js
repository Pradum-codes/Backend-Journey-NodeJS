const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');

router.get('/get', taskController.getTasksForUser);
router.post('/create', taskController.createTaskForUser);
router.put('/update', taskController.toggleTaskComplete);
router.delete('/delete', taskController.deleteTask);

module.exports = router;

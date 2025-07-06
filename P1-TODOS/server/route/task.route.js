const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');
const auth = require('../middleware/auth')

router.get('/get', auth, taskController.getTasksForUser);
router.post('/create', auth, taskController.createTaskForUser);
router.put('/update', auth, taskController.toggleTaskComplete);
router.delete('/delete', auth, taskController.deleteTask);

module.exports = router;

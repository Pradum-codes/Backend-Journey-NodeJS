const Task = require('../model/task.model');

const getTasksForUser = async (req, res) => {
    const userId = req.query.uid;
    try {
        const tasks = await Task.find({ uid: userId });
        res.json(tasks);
    } catch (err) {
        console.log("Error Getting Task: ", err);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

const createTaskForUser = async (req, res) => {
  try {
    const { uid, description } = req.body;
    const task = new Task({ uid, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

module.exports = {
  getTasksForUser,
  createTaskForUser
};

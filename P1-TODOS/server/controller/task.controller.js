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

const toggleTaskComplete = async (req, res) => {
    try {
        const { _id } = req.body;
        const task = await Task.findById(_id);
        
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        task.completed = !task.completed;
        await task.save();
        
        res.status(200).json(task);
    } catch(err){
        console.log("Error toggling task: ", err);
        res.status(400).json({error: "Failed to toggle task"});
    }
}

const deleteTask = async (req, res) => {
    try {
        const { _id } = req.body;
        const task = await Task.findById(_id);
        
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        await Task.findByIdAndDelete(_id);
        
        res.status(200).json({ message: "Task deleted successfully", deletedTask: task });
    } catch(err){
        console.log("Error deleting task: ", err);
        res.status(400).json({error: "Failed to delete task"});
    }
}



module.exports = {
  getTasksForUser,
  createTaskForUser,
  toggleTaskComplete,
  deleteTask
};

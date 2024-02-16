

const Task = require('../models/Tasks');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await Task.find({owner:userId});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task
const getTaskbyId = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
};

// Create a task
const createTask = async (req, res) => {
  console.log(req.body)
  const task = new Task({
    title: req.body.title,
    owner: req.user.userId,
  });

  try {
    const newTask = await task.save();
    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (req.body.title != null) {
      task.title = req.body.title;
    }

    if (req.body.completed != null) {
      task.completed = req.body.completed;
    }
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { createTask, getAllTasks, getTaskbyId, updateTask, deleteTask };

import Task from '../models/Task.js';

// Create task
export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, dueDate, status, customFields } = req.body;

    const taskData = {
      title,
      description,
      dueDate,
      status,
      customFields, // Save custom fields
      createdBy: userId
    };

    const task = await Task.create(taskData);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
    try {
      const userId = req.user.id;
      const tasks = await Task.find({ createdBy: userId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get task by ID for the authenticated user
  export const getTaskById = async (req, res) => {
    try {
      const userId = req.user.id;
      const task = await Task.findOne({ _id: req.params.id, createdBy: userId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update task by ID for the authenticated user
  export const updateTask = async (req, res) => {
    try {
      const userId = req.user.id;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, createdBy: userId },
        req.body,
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete task by ID for the authenticated user
  export const deleteTask = async (req, res) => {
    try {
      const userId = req.user.id;
      const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: userId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

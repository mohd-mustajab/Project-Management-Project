const Task = require("../models/task.model");

exports.getDashboard = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Done").length;
  const overdue = tasks.filter(t => new Date(t.dueDate) < new Date()).length;

  res.json({ total, completed, overdue });
};
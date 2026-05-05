const Task = require("../models/task.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

exports.createTask = async (req, res) => {
  console.log("Creating task for user:", req.user);
  const { title, description, projectId, assigneeEmail } = req.body;

  // Validate required fields
  if (!title || !description || !projectId || !assigneeEmail) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Check if project exists
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ msg: "Project not found" });
  }

  // Find the assignee by email
  const assignee = await User.findOne({ email: assigneeEmail });
  if (!assignee) {
    return res.status(404).json({ msg: "Email ID not found. Please check the email address and try again." });
  }

  // Check if assigned user is a member of the project
  if (!project.members.includes(assignee._id)) {
    return res.status(400).json({ msg: "This user is not a member of the project. Only project members can be assigned tasks." });
  }

  const task = await Task.create({
    title,
    description,
    projectId,
    assignedTo: assignee._id,
  });

  res.json(await task.populate("assignedTo"));
};

exports.getTasks = async (req, res) => {
  if (req.user.role === "Admin") {
    const tasks = await Task.find().populate("assignedTo");
    return res.json(tasks);
  }

  const tasks = await Task.find({ assignedTo: req.user.id }).populate("assignedTo");
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
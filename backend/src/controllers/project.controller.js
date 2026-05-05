const Project = require("../models/project.model");
const User = require("../models/user.model");
const Task = require("../models/task.model");

exports.createProject = async (req, res) => {
  console.log("Creating project for user:", req.user);
  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id,
    members: [req.user.id] // Add creator as member
  });
  res.json(project);
};

exports.getProjects = async (req, res) => {
  if (req.user.role === "Admin") {
    const projects = await Project.find().populate("members");
    return res.json(projects);
  }

  const projects = await Project.find({
    members: req.user.id
  }).populate("members");
  res.json(projects);
};

exports.addMember = async (req, res) => {
  const { userId, email } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ msg: "Project not found" });

  const user = userId
    ? await User.findById(userId)
    : await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (project.members.includes(user._id)) {
    return res.status(400).json({ msg: "User is already a project member" });
  }

  project.members.push(user._id);
  await project.save();

  res.json(await project.populate("members"));
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ msg: "Project not found" });

  // Delete all tasks associated with this project
  await Task.deleteMany({ projectId: req.params.id });

  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Project and associated tasks deleted" });
};
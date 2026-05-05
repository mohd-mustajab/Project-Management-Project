const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const { createProject, getProjects, addMember, deleteProject } = require("../controllers/project.controller");

router.post("/", auth, isAdmin, createProject);
router.get("/", auth, getProjects);
router.post("/:id/add-member", auth, isAdmin, addMember);
router.delete("/:id", auth, isAdmin, deleteProject);

module.exports = router;
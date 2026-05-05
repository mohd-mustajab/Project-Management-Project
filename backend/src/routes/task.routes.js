const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/task.controller");

router.post("/", auth, isAdmin, createTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, isAdmin, deleteTask);

module.exports = router;
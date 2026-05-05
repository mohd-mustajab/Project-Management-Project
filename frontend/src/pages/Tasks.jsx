import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { getUserRole, getUserEmail } from "../utils/helpers";

export default function Tasks() {
  const role = getUserRole();
  const email = getUserEmail();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const handleProjectChange = (e) => {
    const pId = e.target.value;
    setProjectId(pId);
    setAssigneeEmail("");
    setError("");
    const selectedProject = projects.find((p) => p._id === pId);
    setProjectMembers(selectedProject?.members || []);
  };

  useEffect(() => {
    fetchTasks();
    if (role === "Admin") fetchProjects();
  }, []);

  const update = async (id) => {
    await API.patch(`/tasks/${id}`, { status: "Done" });
    fetchTasks();
  };

  const createTask = async () => {
    if (!title.trim() || !description.trim() || !projectId || !assigneeEmail.trim()) return;
    try {
      await API.post("/tasks", {
        title,
        description,
        projectId,
        assigneeEmail: assigneeEmail.trim(),
      });
      setTitle("");
      setDescription("");
      setProjectId("");
      setAssigneeEmail("");
      setProjectMembers([]);
      setMessage("Task created successfully.");
      setError("");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setMessage("");
    }
  };

  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setMessage("");
    }
  };

  const visibleTasks = tasks.filter((task) => role === "Admin" || task.assignedTo?.email === email);
  const selectedProject = projects.find((project) => project._id === projectId);

  return (
    <Layout>
      <div className="mb-6 animate-slide-up rounded-[30px] bg-slate-900/90 p-8 shadow-2xl shadow-slate-900/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Manage assignments, priorities, and sprint delivery from one polished workspace.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-800/80 px-5 py-4 shadow-inner border border-slate-700">
            <p className="text-xs uppercase text-slate-400">Current mode</p>
            <p className="mt-1 text-lg font-semibold text-white">{role === "Admin" ? "Admin" : "Member"}</p>
          </div>
        </div>
      </div>

      {role === "Admin" && (
        <section className="mb-8 rounded-[30px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl shadow-slate-950/40">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <select
                className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                value={projectId}
                onChange={handleProjectChange}
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <input
                className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                placeholder="Assignee email"
                value={assigneeEmail}
                onChange={(e) => setAssigneeEmail(e.target.value)}
                type="email"
              />
            </div>
          </div>

          {selectedProject && (
            <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-slate-400">
              <p className="text-sm font-medium text-slate-200">Selected project members</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {projectMembers.length > 0 ? (
                  projectMembers.map((member) => (
                    <span key={member._id} className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">
                      {member.name || member.email}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No members found for this project.</span>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={createTask}
              className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Create task
            </button>
            <p className="text-sm text-slate-400">Enter the assigned member's email after selecting a project.</p>
          </div>

          {(error || message) && (
            <div className={`mt-4 rounded-3xl border p-4 text-sm shadow-lg ${error ? "border-rose-500/30 bg-rose-500/10 text-rose-100 animate-fade-in" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-100 animate-fade-in"}`}>
              {error || message}
            </div>
          )}
        </section>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {visibleTasks.map((task) => (
          <div key={task._id} className="rounded-[30px] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40 transition hover:-translate-y-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{task.title}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${task.status === "Done" ? "bg-emerald-500/15 text-emerald-200" : task.status === "In Progress" ? "bg-amber-500/15 text-amber-200" : "bg-sky-500/15 text-sky-200"}`}>
                {task.status}
              </span>
            </div>
            <p className="mt-4 text-slate-400">{task.description}</p>
            {task.assignedTo?.email && (
              <p className="mt-4 text-sm text-slate-300">
                Assignee: <span className="font-medium text-slate-100">{task.assignedTo.email}</span>
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {task.status !== "Done" && (
                <button
                  onClick={() => update(task._id)}
                  className="rounded-3xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Mark Done
                </button>
              )}
              {role === "Admin" && (
                <button
                  onClick={() => deleteTask(task._id)}
                  className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

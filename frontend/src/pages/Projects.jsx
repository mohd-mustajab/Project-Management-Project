import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { getUserRole, getUserEmail } from "../utils/helpers";

export default function Projects() {
  const role = getUserRole();
  const email = getUserEmail();
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [memberEmails, setMemberEmails] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!name.trim()) return;
    try {
      await API.post("/projects", { name });
      setName("");
      setMessage("Project created successfully.");
      setError("");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setMessage("");
    }
  };

  const addMember = async (projectId) => {
    const emailToAdd = memberEmails[projectId]?.trim();
    if (!emailToAdd) return;
    try {
      await API.post(`/projects/${projectId}/add-member`, { email: emailToAdd });
      setMemberEmails((prev) => ({ ...prev, [projectId]: "" }));
      setMessage("Member added successfully.");
      setError("");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setMessage("");
    }
  };

  const deleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project? All tasks related to this project will also be deleted.")) return;
    try {
      await API.delete(`/projects/${projectId}`);
      setMessage("Project deleted along with its tasks.");
      setError("");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setMessage("");
    }
  };

  return (
    <Layout>
      <div className="mb-8 animate-slide-up rounded-[30px] bg-slate-900/90 p-8 shadow-2xl shadow-slate-900/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Track your teams, add members, and control which projects are active in the workspace.
            </p>
          </div>
          {role === "Admin" && (
            <div className="rounded-3xl bg-slate-800/80 px-5 py-4 shadow-inner border border-slate-700">
              <p className="text-sm text-slate-400">Admin controls</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">Create projects and add members</p>
            </div>
          )}
        </div>
      </div>

      {(message || error) && (
        <div className={`mb-6 rounded-3xl p-4 text-sm shadow-lg ${error ? "bg-rose-500/15 border border-rose-500 text-rose-100 animate-fade-in" : "bg-emerald-500/15 border border-emerald-500 text-emerald-100 animate-fade-in"}`}>
          {error || message}
        </div>
      )}

      {role === "Admin" && (
        <div className="mb-8 rounded-[30px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl shadow-slate-900/30">
          <div className="grid gap-4 lg:grid-cols-[1fr_160px]">
            <input
              className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New project name"
            />
            <button
              onClick={createProject}
              className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Create Project
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {projects
          .filter((p) => role === "Admin" || p.members?.some((m) => m.email === email))
          .map((p) => (
            <div key={p._id} className="rounded-[30px] bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/40 border border-slate-800 transition hover:-translate-y-1 hover:border-cyan-500/30 overflow-hidden">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="break-words text-xl font-semibold text-white">{p.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">{p.members?.length || 0} members</p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Project</span>
              </div>

              <div className="mt-5 grid gap-2">
                <div className="flex flex-wrap gap-2 overflow-hidden">
                  {p.members?.map((member) => (
                    <span key={member._id} className="max-w-full break-words rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {member.name || member.email}
                    </span>
                  ))}
                </div>

                {role === "Admin" && (
                  <div className="mt-4 rounded-3xl bg-slate-950/80 p-4 border border-slate-800">
                    <p className="text-sm text-slate-400">Add a project member</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
                      <input
                        className="min-w-0 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
                        placeholder="Member email"
                        value={memberEmails[p._id] || ""}
                        onChange={(e) => setMemberEmails((prev) => ({ ...prev, [p._id]: e.target.value }))}
                      />
                      <button
                        onClick={() => addMember(p._id)}
                        className="w-full rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 sm:w-auto"
                      >
                        Add
                      </button>
                    </div>
                    <button
                      onClick={() => deleteProject(p._id)}
                      className="mt-4 rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                    >
                      Delete Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

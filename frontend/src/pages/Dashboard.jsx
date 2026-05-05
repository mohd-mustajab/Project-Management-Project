import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { getUserRole } from "../utils/helpers";

export default function Dashboard() {
  const [data, setData] = useState({});
  const role = getUserRole();

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-2 animate-fade-in rounded-[30px] bg-gradient-to-r from-cyan-500 to-slate-700 p-6 shadow-2xl shadow-cyan-500/20 text-slate-100">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">Total Tasks</p>
          <p className="text-5xl font-bold">{data.total || 0}</p>
          <p className="text-sm text-cyan-100/80">Overview of all active tasks in your workspace.</p>
        </div>

        <div className="space-y-2 animate-fade-in rounded-[30px] bg-gradient-to-r from-emerald-500 to-slate-700 p-6 shadow-2xl shadow-emerald-500/20 text-slate-100">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-100/80">Completed</p>
          <p className="text-5xl font-bold">{data.completed || 0}</p>
          <p className="text-sm text-emerald-100/80">Tasks marked done by your team so far.</p>
        </div>

        <div className="space-y-2 animate-fade-in rounded-[30px] bg-gradient-to-r from-rose-500 to-slate-700 p-6 shadow-2xl shadow-rose-500/20 text-slate-100">
          <p className="text-sm uppercase tracking-[0.25em] text-rose-100/80">Pending</p>
          <p className="text-5xl font-bold">{(data.total || 0) - (data.completed || 0)}</p>
          <p className="text-sm text-rose-100/80">Tasks still waiting for action.</p>
        </div>
      </div>

      <section className="mt-8 rounded-[30px] bg-slate-900/90 p-8 shadow-2xl shadow-slate-900/40 animate-slide-up">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              {role === "Admin"
                ? "Your workspace is ready. Drive project progress, keep your team aligned, and review prioritized tasks at a glance."
                : "Check your assigned tasks, update statuses, and stay on track with your project team."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-800/80 p-4 text-center">
              <p className="text-sm text-slate-400">Team cohesion</p>
              <p className="mt-2 text-2xl font-bold text-white">Strong</p>
            </div>
            <div className="rounded-3xl bg-slate-800/80 p-4 text-center">
              <p className="text-sm text-slate-400">Focus</p>
              <p className="mt-2 text-2xl font-bold text-white">High</p>
            </div>
            <div className="rounded-3xl bg-slate-800/80 p-4 text-center">
              <p className="text-sm text-slate-400">Visibility</p>
              <p className="mt-2 text-2xl font-bold text-white">Clear</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
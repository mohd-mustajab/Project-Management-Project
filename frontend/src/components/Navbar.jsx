import { getUserName, getUserEmail, getUserRole } from "../utils/helpers";

export default function Navbar() {
  const name = getUserName();
  const email = getUserEmail();
  const role = getUserRole();

  return (
    <header className="bg-slate-900 text-slate-100 shadow-xl px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">Project management</p>
        <h1 className="text-2xl font-semibold tracking-tight">Project Management</h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="rounded-3xl bg-slate-800/90 px-4 py-3 shadow-lg border border-slate-700">
          <p className="text-xs uppercase text-slate-400 tracking-[0.2em]">Signed in as</p>
          <p className="mt-1 font-semibold text-white">{name || "Guest"}</p>
          <p className="text-xs text-slate-500">{email || "No email"}</p>
        </div>

        <div className="rounded-3xl bg-slate-800/90 px-4 py-3 shadow-lg border border-slate-700 text-right">
          <span className="inline-flex items-center rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            {role}
          </span>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition duration-300 hover:bg-cyan-400"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
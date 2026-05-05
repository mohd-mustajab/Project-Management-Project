import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" },
  { label: "Tasks", to: "/tasks" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:w-72 flex-col bg-slate-950 text-slate-100 shadow-2xl">
      <div className="px-8 py-8 border-b border-slate-800">
        <div className="text-2xl font-semibold tracking-tight">PM Suite</div>
        <p className="mt-2 text-sm text-slate-400">Organize work with ease.</p>
      </div>

      <nav className="flex-1 px-6 py-6 space-y-3">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${
                active ? "bg-cyan-500 text-slate-950 shadow-xl" : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pb-8">
        <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800 shadow-inner">
          <p className="text-sm text-slate-500">Need help?</p>
          <p className="mt-2 text-sm text-slate-100">Contact your admin or check team docs.</p>
        </div>
      </div>
    </aside>
  );
}
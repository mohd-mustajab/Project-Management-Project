import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 md:p-8">{children}</main>
          <footer className="border-t border-slate-800 bg-slate-950/90 px-6 py-4 text-sm text-slate-400">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} Project Management</span>
              <span>Created by Mustajab</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
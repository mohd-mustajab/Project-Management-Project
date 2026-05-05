import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { saveAuthInfo } from "../utils/helpers";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", data);
      saveAuthInfo({ token: res.data.token, user: res.data.user, role: res.data.role });
      nav("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Wrong email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-[40px] bg-slate-900/90 p-10 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Welcome back</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Sign in to your dashboard</h1>
          <p className="mx-auto max-w-2xl text-slate-400">Securely login to manage projects, assign tasks, and track team performance.</p>
        </div>

        {error && (
          <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-lg animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr]">
          <input
            className="rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-500"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 pr-12 text-slate-100 outline-none transition focus:border-cyan-500"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button className="rounded-3xl bg-cyan-500 px-5 py-4 text-base font-semibold uppercase tracking-[0.1em] text-slate-950 transition duration-300 hover:bg-cyan-400">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
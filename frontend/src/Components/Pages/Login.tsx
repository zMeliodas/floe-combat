import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// NOTE: this calls POST /api/auth/login on your backend, expecting
// { email, password } in the body and a session cookie set on success
// (that's why `credentials: "include"` is required — without it, the
// browser won't send/accept the httpOnly session cookie). This will 404
// until the actual login route is built on top of the session middleware
// (express-session + connect-pg-simple) — the UI is just wired ahead of it.

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Invalid email or password.");
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Couldn't reach the server. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1">
          <span className="font-archivo text-lg tracking-[3px] text-white">
            FLOE COMBAT
          </span>
          <span className="font-montserrat text-[12px] tracking-[3px] text-floesky">
            ADMIN LOGIN
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-montserrat text-[11px] tracking-wider text-white/40">
              USERNAME
            </label>
            <input
              type="email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              className="bg-white/2 border border-white/10 px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-floesky/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-montserrat text-[11px] tracking-wider text-white/40">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/2 border border-white/10 px-3 py-2.5 pr-10 font-montserrat text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-floesky/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
              >
                {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="font-montserrat text-[11px] text-red-400/80 -mt-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-floesky text-black font-montserrat font-bold text-xs px-4 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SIGNING IN..." : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
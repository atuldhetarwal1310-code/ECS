import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  BatteryCharging, 
  MapPin, 
  LogOut,
  Sparkles,
  Zap
} from "lucide-react";

export default function HeroLoginCard() {
  const { 
    currentUser, 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle, 
    logout 
  } = useAuth();

  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (mode === "signup" && !name) {
      setError("Please provide your full name.");
      return;
    }

    try {
      setLoading(true);
      if (mode === "signin") {
        await loginWithEmail(email, password);
        setSuccess("Connected as Guardian!");
      } else {
        await signupWithEmail(email, password, name);
        setSuccess("Guardian account registered!");
      }
    } catch (err) {
      setError(err?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      await loginWithEmail("guardian@presidium.io", "demo123456");
      setSuccess("Logged in as Primary Guardian!");
    } catch (err) {
      setError(err?.message || "Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      await loginWithGoogle();
      setSuccess("Google Sign-In successful!");
    } catch (err) {
      setError(err?.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Decorative ambient background glows */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative bg-slate-900/85 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-7 md:p-8 shadow-2xl text-white overflow-hidden">
        
        {/* Top Status Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">
              {currentUser ? "Live Guardian Console" : "Guardian Portal"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <ShieldCheck size={14} />
            <span>Encrypted</span>
          </div>
        </div>

        {/* Content Section: Logged In vs Logged Out */}
        {currentUser ? (
          <div className="mt-6 space-y-6 animate-fadeIn">
            {/* User Profile Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-950 border border-cyan-400/40 relative overflow-hidden shadow-lg">
              <div className="flex items-center gap-4">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="User Avatar" 
                    className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-xl shadow-md">
                    {(currentUser.displayName || currentUser.email || "G")[0].toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {currentUser.displayName || "Primary Guardian"}
                    <Sparkles size={16} className="text-cyan-400" />
                  </h3>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ● Active Connection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Device Status Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
                <span>PRAESIDIUM Watch #041</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Activity size={13} /> Synchronized
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <BatteryCharging size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Battery</p>
                    <p className="text-sm font-bold text-white">94% • 18 hrs</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Geofence</p>
                    <p className="text-sm font-bold text-white">Home Zone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <button 
                onClick={logout}
                className="w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Disconnect Session
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-5 animate-fadeIn">
            {/* Header Text */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {mode === "signin" ? "Access Guardian Console" : "Register New Guardian"}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Monitor real-time obstacle alerts, fall notifications & live GPS location.
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => { setMode("signin"); setError(""); }}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  mode === "signin"
                    ? "bg-cyan-500 text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(""); }}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  mode === "signup"
                    ? "bg-cyan-500 text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Alerts */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{success}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "signup" && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-gray-400 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-xs transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-400 mb-1">
                  Guardian Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guardian@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-xs transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-xs transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold text-sm transition shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === "signin" ? "Sign In as Guardian" : "Register Guardian"}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo & Social Login */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Zap size={14} className="text-cyan-400" />
                <span>Quick Demo</span>
              </button>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-gray-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google SSO</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

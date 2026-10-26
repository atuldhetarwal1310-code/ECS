import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
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
    logout 
  } = useAuth();

  const { isCute } = useTheme();

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
        setSuccess("Guardian registered! Please verify your email before connecting.");
        setMode("signin");
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

  return (
    <div className="relative group">
      {/* Decorative ambient background glows */}
      <div 
        className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 pointer-events-none ${
          isCute
            ? "bg-gradient-to-r from-rose-500/30 to-purple-600/30"
            : "bg-zinc-800/40"
        }`} 
      />

      {/* Main Glassmorphic Container */}
      <div 
        className={`relative backdrop-blur-2xl rounded-3xl p-7 md:p-8 shadow-2xl transition-all duration-300 border ${
          isCute
            ? "bg-[#180f1d]/90 border-rose-500/30 text-rose-50 shadow-[0_15px_40px_rgba(244,63,94,0.15)]"
            : "bg-[#121215]/90 border-zinc-800 text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        }`}
      >
        
        {/* Top Status Header */}
        <div className={`flex items-center justify-between pb-5 border-b ${
          isCute ? "border-rose-500/20" : "border-zinc-800/80"
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isCute ? "bg-rose-400" : "bg-emerald-400"
              }`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                isCute ? "bg-rose-500" : "bg-emerald-500"
              }`} />
            </span>
            <span className={`text-xs font-extrabold tracking-widest uppercase font-mono ${
              isCute ? "text-rose-400" : "text-zinc-300"
            }`}>
              {currentUser ? "Live Guardian Console" : "Guardian Portal"}
            </span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isCute 
              ? "bg-rose-500/10 border-rose-500/30 text-rose-300" 
              : "bg-zinc-900 border-zinc-700 text-zinc-300"
          }`}>
            <ShieldCheck size={14} />
            <span>Encrypted</span>
          </div>
        </div>

        {/* Content Section: Logged In vs Logged Out */}
        {currentUser ? (
          <div className="mt-6 space-y-6 animate-fadeIn">
            {/* User Profile Card */}
            <div className={`p-5 rounded-2xl border relative overflow-hidden shadow-lg ${
              isCute
                ? "bg-rose-950/20 border-rose-500/30"
                : "bg-zinc-900/70 border-zinc-700/60"
            }`}>
              <div className="flex items-center gap-4">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="User Avatar" 
                    className="w-14 h-14 rounded-full border-2 border-zinc-700 object-cover shadow-md"
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-xl shadow-md ${
                    isCute 
                      ? "bg-rose-500/20 border-rose-400 text-rose-300" 
                      : "bg-zinc-800 border-zinc-700 text-zinc-200"
                  }`}>
                    {(currentUser.displayName || currentUser.email || "G")[0].toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {currentUser.displayName || "Primary Guardian"}
                    <Sparkles size={16} className={isCute ? "text-rose-400" : "text-amber-400"} />
                  </h3>
                  <p className="text-xs text-zinc-400">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                      ● Active Guardian Link
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Device Status Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 px-1 font-mono">
                <span>PRAESIDIUM S1 Hardware</span>
                <span className={`flex items-center gap-1 ${isCute ? "text-rose-400" : "text-emerald-400"}`}>
                  <Activity size={13} /> Streaming
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                  isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
                }`}>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <BatteryCharging size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Battery</p>
                    <p className="text-sm font-bold text-white font-mono">89% • Active</p>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                  isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
                }`}>
                  <div className={`p-2 rounded-lg ${isCute ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"}`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Geofence</p>
                    <p className="text-sm font-bold text-white">Campus Zone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <button 
                onClick={logout}
                className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/40 font-semibold text-sm transition flex items-center justify-center gap-2"
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
                {mode === "signin" ? "Guardian Console" : "Register Guardian"}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Monitor real-time obstacle alerts, fall notifications & live GPS location.
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-2 p-1 bg-black/50 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => { setMode("signin"); setError(""); }}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  mode === "signin"
                    ? isCute ? "bg-rose-500 text-white shadow-md" : "bg-white text-black shadow-md font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(""); }}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  mode === "signup"
                    ? isCute ? "bg-rose-500 text-white shadow-md" : "bg-white text-black shadow-md font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Alerts */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-shake">
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
                  <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-amber-400 focus:outline-none text-white text-xs transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Guardian Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guardian@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-amber-400 focus:outline-none text-white text-xs transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-amber-400 focus:outline-none text-white text-xs transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                  isCute
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white shadow-rose-500/25"
                    : "bg-white hover:bg-zinc-200 text-black font-extrabold shadow-black/40"
                }`}
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

            {/* Quick Demo */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={loading}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  isCute 
                    ? "bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300" 
                    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                }`}
              >
                <Zap size={14} className={isCute ? "text-rose-400" : "text-amber-400"} />
                <span>Quick Guardian Demo Access</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

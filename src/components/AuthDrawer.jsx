import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2,
  Sparkles,
  MapPin,
  HeartPulse
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthDrawer() {
  const { 
    currentUser, 
    isDrawerOpen, 
    drawerMode, 
    setDrawerMode, 
    closeDrawer,
    loginWithEmail,
    signupWithEmail,
    logout 
  } = useAuth();
  
  const { isCute } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isDrawerOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (drawerMode === "signup" && !name) {
      setError("Please provide your full name.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (drawerMode === "signin") {
        await loginWithEmail(email, password);
        setSuccess("Successfully signed in!");
        setTimeout(() => {
          closeDrawer();
          resetForm();
        }, 1000);
      } else {
        await signupWithEmail(email, password, name);
        setSuccess("Account registered! Please check your inbox to verify your email, then sign in.");
        setDrawerMode("signin");
      }
    } catch (err) {
      setError(err.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeDrawer();
    } catch (err) {
      setError(err?.message || "Failed to sign out.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay with blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className={`w-screen max-w-md border-l shadow-2xl p-8 flex flex-col justify-between overflow-y-auto relative animate-slideInRight transition-all duration-300 ${
            isCute
              ? "bg-[#180f1d] border-rose-500/30 text-rose-50"
              : "bg-[#0f0f12] border-zinc-800 text-zinc-100"
          }`}
        >
          
          {/* Header */}
          <div>
            <div className={`flex items-center justify-between pb-6 border-b ${
              isCute ? "border-rose-500/20" : "border-zinc-800"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${
                  isCute ? "bg-rose-500/20 border-rose-500/30 text-rose-300" : "bg-zinc-800 border-zinc-700 text-amber-400"
                }`}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    {currentUser ? "Guardian Portal" : drawerMode === "signin" ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {currentUser ? "Manage user tracking & emergency alerts" : "Access your PRAESIDIUM dashboard"}
                  </p>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition duration-200"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content area: Signed In vs Auth Form */}
            {currentUser ? (
              <div className="mt-8 space-y-6">
                {/* User Profile Card */}
                <div className={`p-6 rounded-2xl border shadow-lg relative overflow-hidden ${
                  isCute 
                    ? "bg-rose-950/20 border-rose-500/30" 
                    : "bg-zinc-900/60 border-zinc-700/60"
                }`}>
                  <div className="flex items-center gap-4">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Avatar" 
                        className="w-14 h-14 rounded-full border-2 border-zinc-700 object-cover shadow-md"
                      />
                    ) : (
                      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-xl shadow-md ${
                        isCute 
                          ? "bg-rose-500/20 border-rose-400 text-rose-300" 
                          : "bg-zinc-800 border-zinc-700 text-zinc-200"
                      }`}>
                        {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {currentUser.displayName || "Presidium User"}
                        <Sparkles size={16} className={isCute ? "text-rose-400" : "text-amber-400"} />
                      </h3>
                      <p className="text-sm text-zinc-400">{currentUser.email}</p>
                      <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {currentUser.role || "Primary Guardian"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Quick Stats & Controls */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase font-mono">
                    Active System Status
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                      <div className={`flex items-center gap-2 mb-2 ${isCute ? "text-rose-400" : "text-amber-400"}`}>
                        <MapPin size={18} />
                        <span className="text-xs font-bold uppercase">Geofence</span>
                      </div>
                      <p className="text-lg font-bold text-white">Active Zone</p>
                      <p className="text-xs text-emerald-400 mt-1">● Safe Boundary</p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                      <div className={`flex items-center gap-2 mb-2 ${isCute ? "text-purple-400" : "text-emerald-400"}`}>
                        <HeartPulse size={18} />
                        <span className="text-xs font-bold uppercase">Fall Sensor</span>
                      </div>
                      <p className="text-lg font-bold text-white">Monitoring</p>
                      <p className="text-xs text-emerald-400 mt-1">● Real-time Sync</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => { closeDrawer(); navigate('/dashboard'); }}
                    className={`w-full py-3 px-4 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 ${
                      isCute 
                        ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white" 
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    Open Guardian Dashboard
                    <ArrowRight size={18} />
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/40 font-semibold transition flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                {/* Auth Mode Toggle Tabs */}
                <div className="grid grid-cols-2 p-1 bg-black/50 rounded-xl border border-zinc-800">
                  <button
                    onClick={() => { setDrawerMode("signin"); setError(""); }}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${
                      drawerMode === "signin"
                        ? isCute ? "bg-rose-500 text-white shadow-md" : "bg-white text-black shadow-md font-extrabold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setDrawerMode("signup"); setError(""); }}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${
                      drawerMode === "signup"
                        ? isCute ? "bg-rose-500 text-white shadow-md" : "bg-white text-black shadow-md font-extrabold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Feedback Alerts */}
                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-2 animate-shake">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>{success}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {drawerMode === "signup" && (
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon size={18} className="absolute left-3.5 top-3.5 text-zinc-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-amber-400 focus:outline-none text-white text-sm transition"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3.5 top-3.5 text-zinc-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-amber-400 focus:outline-none text-white text-sm transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-3.5 text-zinc-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-amber-400 focus:outline-none text-white text-sm transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-zinc-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-2 py-3 px-4 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 ${
                      isCute 
                        ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white" 
                        : "bg-amber-400 hover:bg-amber-300 text-black font-extrabold"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{drawerMode === "signin" ? "Sign In to Account" : "Complete Registration"}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 font-mono">
              PRAESIDIUM Smart Safety Network • 256-bit Secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

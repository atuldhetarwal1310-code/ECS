import { useState } from "react";
import { useAuth } from "../context/AuthContext";
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

export default function AuthDrawer() {
  const { 
    currentUser, 
    isDrawerOpen, 
    drawerMode, 
    setDrawerMode, 
    closeDrawer,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout 
  } = useAuth();

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
      } else {
        await signupWithEmail(email, password, name);
        setSuccess("Account created successfully!");
      }
      setTimeout(() => {
        closeDrawer();
        resetForm();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");
    try {
      setIsSubmitting(true);
      await loginWithGoogle();
      setSuccess("Signed in with Google!");
      setTimeout(() => {
        closeDrawer();
        resetForm();
      }, 900);
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gradient-to-b from-slate-900 via-[#0a1526] to-[#020617] border-l border-cyan-500/20 text-white shadow-2xl p-8 flex flex-col justify-between overflow-y-auto relative animate-slideInRight">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-wide">
                    {currentUser ? "Guardian Portal" : drawerMode === "signin" ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {currentUser ? "Manage user tracking & emergency alerts" : "Access your PRAESIDIUM dashboard"}
                  </p>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-slate-800 text-gray-400 hover:text-white transition duration-200"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content area: Signed In vs Auth Form */}
            {currentUser ? (
              <div className="mt-8 space-y-6">
                {/* User Profile Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-cyan-500/30 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Avatar" 
                        className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-2xl shadow-md">
                        {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {currentUser.displayName || "Presidium User"}
                        <Sparkles size={16} className="text-cyan-400" />
                      </h3>
                      <p className="text-sm text-gray-400">{currentUser.email}</p>
                      <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                        {currentUser.role || "Primary Guardian"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Quick Stats & Controls */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Active System Status
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 text-cyan-400 mb-2">
                        <MapPin size={18} />
                        <span className="text-xs font-bold uppercase">Geofence</span>
                      </div>
                      <p className="text-lg font-bold text-white">Active Zone</p>
                      <p className="text-xs text-emerald-400 mt-1">● Safe Boundary</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 text-cyan-400 mb-2">
                        <HeartPulse size={18} />
                        <span className="text-xs font-bold uppercase">Fall Sensor</span>
                      </div>
                      <p className="text-lg font-bold text-white">Monitoring</p>
                      <p className="text-xs text-cyan-400 mt-1">● Real-time Sync</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <button className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2">
                    Open Guardian Dashboard
                    <ArrowRight size={18} />
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 font-semibold transition flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                {/* Auth Mode Toggle Tabs */}
                <div className="grid grid-cols-2 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
                  <button
                    onClick={() => { setDrawerMode("signin"); setError(""); }}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${
                      drawerMode === "signin"
                        ? "bg-cyan-500 text-black shadow-md"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setDrawerMode("signup"); setError(""); }}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${
                      drawerMode === "signup"
                        ? "bg-cyan-500 text-black shadow-md"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Feedback Alerts */}
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2 animate-shake">
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

                {/* Social Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition flex items-center justify-center gap-3 hover:border-cyan-400/50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                  Continue with Google
                </button>

                <div className="relative flex items-center my-4">
                  <div className="flex-grow border-t border-slate-800" />
                  <span className="shrink mx-4 text-xs font-semibold uppercase text-gray-500">
                    or continue with email
                  </span>
                  <div className="flex-grow border-t border-slate-800" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {drawerMode === "signup" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-sm transition"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-sm transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-sm transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold transition shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {drawerMode === "signin" ? "Sign In to Account" : "Complete Registration"}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-gray-500">
              PRAESIDIUM Smart Safety Network • Secured by 256-bit Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

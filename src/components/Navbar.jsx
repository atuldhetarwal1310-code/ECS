import { useAuth } from "../context/AuthContext";
import { User, LogIn } from "lucide-react";

export default function Navbar() {
  const { currentUser, openDrawer } = useAuth();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">

      <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl">

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          PRAESIDIUM
        </h1>

        <div className="hidden md:flex gap-10 text-gray-300">
          <a href="#home" className="hover:text-cyan-400 transition">
            Home
          </a>
          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>
          <a href="#howitworks" className="hover:text-cyan-400 transition">
            How It Works
          </a>
          <a href="#demo" className="hover:text-cyan-400 transition">
            Demo
          </a>
          <a href="#faq" className="hover:text-cyan-400 transition">
            FAQ
          </a>
        </div>

        {/* Right side login / user controls */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <button 
              onClick={() => openDrawer("profile")}
              className="flex items-center gap-3 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 px-4 py-2 rounded-xl transition shadow-lg"
            >
              <div className="w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-400/40">
                {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
              </div>
              <span className="hidden sm:inline font-semibold text-sm">
                {currentUser.displayName?.split(" ")[0] || "Dashboard"}
              </span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => openDrawer("signin")}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-semibold px-4 py-2 rounded-xl hover:bg-cyan-500/10"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </button>

              <button 
                onClick={() => openDrawer("signup")}
                className="bg-cyan-500 hover:bg-cyan-400 text-black transition px-6 py-2 rounded-xl font-bold shadow-md hover:shadow-cyan-500/25"
              >
                Your Account
              </button>
            </>
          )}
        </div>

      </div>

    </nav>
  );
}
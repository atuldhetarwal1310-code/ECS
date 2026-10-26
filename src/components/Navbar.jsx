import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useDevice } from "../context/DeviceContext";
import { 
  LogIn, 
  Radio, 
  LayoutDashboard, 
  Menu, 
  X, 
  Sparkles, 
  Heart, 
  Cpu, 
  Palette
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { currentUser, openDrawer } = useAuth();
  const { toggleTheme, isCute } = useTheme();
  const { isPaired, pairedDevice, openPairingModal } = useDevice();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[96%] sm:w-[94%] max-w-7xl z-50">
      <div 
        className={`backdrop-blur-3xl rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center transition-all duration-300 border ${
          isCute
            ? "bg-[#180f1d]/80 border-rose-500/30 shadow-[0_4px_30px_rgba(244,63,94,0.2)]"
            : "bg-[#121215]/85 border-zinc-800 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
        }`}
      >

        {/* Brand & Logo */}
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div 
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition duration-300 border ${
              isCute
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 group-hover:scale-105"
                : "bg-zinc-800 text-amber-400 border-zinc-700 group-hover:bg-zinc-700 group-hover:scale-105"
            }`}
          >
            {isCute ? <Heart size={18} className="animate-pulse fill-rose-500/30" /> : <Radio size={18} className="animate-pulse" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white font-mono">
                PRAESIDIUM
              </h1>
              <span 
                className={`px-1.5 py-0.5 rounded text-[9px] font-black font-mono border hidden xs:inline ${
                  isCute
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700"
                }`}
              >
                S1 OS
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-wider hidden sm:block">
              HARDWARE TELEMETRY PORTAL
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-zinc-300">
          <a href="#home" className="hover:text-white transition duration-200">
            Home
          </a>
          <a href="#features" className="hover:text-white transition duration-200">
            Features
          </a>
          <a href="#howitworks" className="hover:text-white transition duration-200">
            Architecture
          </a>
          <a 
            href="#demo" 
            className={`flex items-center gap-1.5 transition ${
              isCute ? "text-rose-300 hover:text-rose-200" : "text-amber-400 hover:text-amber-300"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isCute ? "bg-rose-400" : "bg-amber-400"}`} />
            <span>Live Demo</span>
          </a>
          <a href="#faq" className="hover:text-white transition duration-200">
            FAQ
          </a>
        </div>

        {/* Right side: Hardware pairing status + Theme Switcher + Auth + Mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Hardware Device Pairing Status Pill */}
          <button
            onClick={openPairingModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              isPaired
                ? isCute
                  ? "bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/40"
                  : "bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-zinc-500"
                : isCute
                  ? "bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-900/40"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
            }`}
            title="Manage Hardware Connection & Supabase Telemetry"
          >
            <Cpu size={14} className={isPaired ? "text-emerald-400 animate-pulse" : ""} />
            <span className="hidden sm:inline">
              {isPaired ? pairedDevice.id : "Pair Hardware"}
            </span>
            <span className="sm:hidden">
              {isPaired ? "ESP32" : "Pair"}
            </span>
            {isPaired && (
              <span className="text-[10px] text-emerald-400 font-bold ml-0.5">●</span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isCute
                ? "bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-amber-500/20 border-rose-400/50 text-rose-200 hover:scale-105 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
            title={isCute ? "Switch to Normal Mode (Sleek Dark)" : "Switch to Cute Mode (Colorful)"}
          >
            {isCute ? (
              <>
                <Sparkles size={14} className="text-rose-400 animate-spin" />
                <span className="hidden sm:inline">Cute Theme</span>
              </>
            ) : (
              <>
                <Palette size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Normal Dark</span>
              </>
            )}
          </button>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {currentUser ? (
              <Link 
                to="/dashboard"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition shadow-md ${
                  isCute
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-rose-500/25"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => openDrawer("signin")}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
                    isCute 
                      ? "text-rose-300 border-rose-500/30 hover:bg-rose-500/10" 
                      : "text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <LogIn size={13} />
                  <span>Sign In</span>
                </button>

                <button 
                  onClick={() => openDrawer("signup")}
                  className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition shadow-md ${
                    isCute
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-95"
                      : "bg-amber-400 hover:bg-amber-300 text-black"
                  }`}
                >
                  Guardian Portal
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl transition md:hidden ${
              isCute 
                ? "text-rose-300 hover:bg-rose-500/20" 
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          className={`md:hidden mt-2 backdrop-blur-2xl rounded-2xl px-5 py-4 space-y-2 animate-fadeIn shadow-2xl border ${
            isCute 
              ? "bg-[#180f1d]/95 border-rose-500/30" 
              : "bg-[#121215]/95 border-zinc-800"
          }`}
        >
          {[
            { href: "#home", label: "Home" },
            { href: "#features", label: "Features" },
            { href: "#howitworks", label: "Architecture" },
            { href: "#demo", label: "Live Demo" },
            { href: "#faq", label: "FAQ" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-sm font-bold text-zinc-300 hover:text-white rounded-xl transition hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border ${
                isCute ? "bg-rose-500/20 border-rose-500/40 text-rose-200" : "bg-zinc-800 border-zinc-700 text-zinc-200"
              }`}
            >
              <Palette size={14} />
              <span>Theme: {isCute ? "🌸 Cute Theme (Switch to Normal)" : "🌙 Normal Dark (Switch to Cute)"}</span>
            </button>

            <button
              onClick={() => {
                openPairingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-amber-400"
            >
              <Cpu size={14} />
              <span>Hardware Pairing ({isPaired ? "Connected" : "Not Paired"})</span>
            </button>

            {!currentUser ? (
              <button 
                onClick={() => { openDrawer("signup"); setMobileMenuOpen(false); }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs ${
                  isCute ? "bg-rose-500 text-white" : "bg-amber-400 text-black font-extrabold"
                }`}
              >
                Guardian Sign In / Register
              </button>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs text-center block ${
                  isCute ? "bg-rose-500 text-white" : "bg-white text-black font-extrabold"
                }`}
              >
                Open Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
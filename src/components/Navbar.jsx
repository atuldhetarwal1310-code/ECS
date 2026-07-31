
export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">

      <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-2xl px-8 py-4 flex justify-between items-center shadow-2xl">

        <h1 className="text-2xl font-bold text-cyan-400">
          PRAESIDIUM

        </h1>

        <div className="hidden md:flex gap-10 text-gray-300">

          <a href="#home" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#hardware" className="hover:text-cyan-400 transition">
            Hardware
          </a>

          <a href="#contact" className="hover:text-cyan-400 transition">
            Contact
          </a>
    
        </div>
        

        <button className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-2 rounded-xl font-semibold">
          Get Started
        </button>

      </div>

    </nav>
  );
}
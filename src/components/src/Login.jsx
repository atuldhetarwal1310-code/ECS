export default function Login() {
  return (
    <div className="min-h-screen bg-[#07111E] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-10 border border-slate-800">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-400">
            PRAESIDIUM
          </h1>

          <p className="text-gray-400 mt-3">
            Welcome Back
          </p>
        </div>

        <form className="space-y-6">

          <div>
            <label className="block mb-2 text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          <div className="flex justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-cyan-400 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-xl font-semibold text-black"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          <button className="text-cyan-400 hover:underline">
            Sign Up
          </button>
        </p>

      </div>

    </div>
  );
}

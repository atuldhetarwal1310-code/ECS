import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DeviceProvider } from "./context/DeviceContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DevicePairingModal from "./components/DevicePairingModal";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DeviceProvider>
          <AuthProvider>
            <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] transition-colors duration-300 relative selection:bg-rose-500/30 selection:text-white">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              {/* Universal Hardware Device Pairing Modal */}
              <DevicePairingModal />
            </div>
          </AuthProvider>
        </DeviceProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
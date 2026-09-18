import { createContext, useContext, useState, useEffect } from "react";
import { 
  auth, 
  googleProvider 
} from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("signin"); // "signin" | "signup"

  const openDrawer = (mode = "signin") => {
    setDrawerMode(mode);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Helper check if Firebase is configured with real key
  const isRealFirebase = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "demo-api-key";

  useEffect(() => {
    // Check local storage for demo user if firebase is in demo mode
    const storedDemoUser = localStorage.getItem("presidium_demo_user");
    if (!isRealFirebase && storedDemoUser) {
      try {
        setCurrentUser(JSON.parse(storedDemoUser));
      } catch (e) {
        console.error("Failed to parse stored demo user", e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isRealFirebase) {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isRealFirebase]);

  const loginWithEmail = async (email, password) => {
    if (isRealFirebase) {
      return await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Demo authentication simulation
      await new Promise((res) => setTimeout(res, 600));
      const demoUser = {
        uid: "demo-user-123",
        email: email,
        displayName: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        photoURL: null,
        isDemo: true,
        role: "Guardian / Caregiver"
      };
      setCurrentUser(demoUser);
      localStorage.setItem("presidium_demo_user", JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const signupWithEmail = async (email, password, name) => {
    if (isRealFirebase) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // User can update profile if needed
      return res;
    } else {
      await new Promise((res) => setTimeout(res, 600));
      const demoUser = {
        uid: `demo-user-${Date.now()}`,
        email: email,
        displayName: name || email.split("@")[0],
        photoURL: null,
        isDemo: true,
        role: "Primary Guardian"
      };
      setCurrentUser(demoUser);
      localStorage.setItem("presidium_demo_user", JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const loginWithGoogle = async () => {
    if (isRealFirebase) {
      return await signInWithPopup(auth, googleProvider);
    } else {
      await new Promise((res) => setTimeout(res, 500));
      const demoUser = {
        uid: "google-demo-user-999",
        email: "alex.caregiver@gmail.com",
        displayName: "Alex Rivera",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        isDemo: true,
        role: "Guardian / Family Member"
      };
      setCurrentUser(demoUser);
      localStorage.setItem("presidium_demo_user", JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const logout = async () => {
    if (isRealFirebase) {
      await firebaseSignOut(auth);
    } else {
      localStorage.removeItem("presidium_demo_user");
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    isDrawerOpen,
    drawerMode,
    setDrawerMode,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

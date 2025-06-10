import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuthStore } from "./store/authStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Layout from "./Layout/Layout";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Help = lazy(() => import("./pages/Help"));
const Emoppers = lazy(() => import("./pages/Emoppers"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading......</p>}>
        <div className="w-screen">
          <main className="">
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route path="/help" element={<Help />} />
              <Route path="/help/Emoppers" element={<Emoppers />} />

            </Routes>
          </main>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;

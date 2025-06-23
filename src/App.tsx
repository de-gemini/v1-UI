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
import CalendarAvailability from "./pages/admin/CalendarAvailability";
import Contact from "./pages/Contact";
import Layout from "./Layout/Layout";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import PricingManagement from "./pages/admin/PricingManagement";
import ErrorAlert from "./components/ErrorAlert";
import SuccessAlert from "./components/SuccessAlert";
import ScheduleManagement from "./pages/admin/ScheduleManagement";
import DeepCleaning from "./pages/DeepCleaning";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin Route wrapper component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  return isAuthenticated && isAdmin ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

const Help = lazy(() => import("./pages/Help"));
const Emoppers = lazy(() => import("./pages/Emoppers"));
const Clients = lazy(() => import("./pages/Clients"));
const Become = lazy(() => import("./pages/BecomeCleaner"));
const GiftVoucher = lazy(() => import("./pages/Gift"));
const Reclean = lazy(() => import("./pages/Reclean"));
const Blog = lazy(() => import("./pages/Blog"));
const HouseCleaning = lazy(() => import("./pages/HouseCleaning"));
const DeppCleaning = lazy(() => import("./pages/DeepCleaning"));
const OfficeCleaning = lazy(() => import("./pages/OfficeCleaning"));


function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading......</p>}>
        <ErrorAlert />
        <SuccessAlert />
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
              <Route path="/help/Clients" element={<Clients />} />
              <Route path="/home/registercleaner" element={<Become />} />
              <Route
                path="/giftVoucher"
                element={
                  <Layout>
                    <GiftVoucher />
                  </Layout>
                }
              />
              <Route
                path="/reclean-guarantee"
                element={
                  <Layout>
                    <Reclean />
                  </Layout>
                }
              />
              <Route path="/blog" element={<Blog />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/pricing"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <PricingManagement />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/calendar"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <CalendarAvailability />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <ScheduleManagement />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/prcing-house-cleaning"
                element={
                    <Layout>
                      <HouseCleaning />
                    </Layout>
                }
              />
              <Route
                path="/prcing-deep-cleaning"
                element={
                    <Layout>
                      <DeepCleaning />
                    </Layout>
                }
              />
              <Route
                path="/prcing-office-cleaning"
                element={
                    <Layout>
                      <OfficeCleaning />
                    </Layout>
                }
              />
            </Routes>
          </main>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;

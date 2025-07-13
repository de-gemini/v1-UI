import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthGateway } from "./Layout/AuthGateway";
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
import StripeTestPage from './pages/StripeTestPage';
import StripeCardPaymentPage from './pages/StripeCardPaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import { useEffect, useState } from "react";
import { isTokenValid } from "./utils/isTokenValid";
import { PendingBookingModal } from "./components/PendingBookingModal";
import ScrollToTop from "./components/ScrollToTop";

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
const OfficeCleaning = lazy(() => import("./pages/OfficeCleaning"));
const EndTenancy = lazy(() => import("./pages/EndTenancy"));
const CarpetCleaning = lazy(() => import("./pages/CarpetCleaning"));
const Upholstery = lazy(() => import("./pages/Upholstery"));
const RegularCleaning = lazy(() => import("./pages/RegularCleaning"));
const OfficeCleaningPage = lazy(() => import("./pages/OfficeCleaningPage"));
const DeepCleaningService = lazy(() => import("./pages/DeepCleaningService"));
const SameDayCleaning = lazy(() => import("./pages/SameDayCleaning"));
const KitchenDeepCleaning = lazy(() => import("./pages/KitchenDeep"));
const EndTenancyService = lazy(() => import("./pages/EndTenancyPage"));
const CarpetService = lazy(() => import("./pages/CarpetService"));
const RugCleaning = lazy(() => import("./pages/RugCleaning"));
const MoveInCleaning = lazy(() => import("./pages/MoveIn"));
const BathroomCleaning = lazy(() => import("./pages/BathroomCleaning"));
const MattressCleaning = lazy(() => import("./pages/MattressCleaning"));
const SpringCleaning = lazy(() => import("./pages/SpringCleaning"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Signup = lazy(() => import("./pages/Signup"));



function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<p>Loading......</p>}>
        <ErrorAlert />
        <SuccessAlert />
        <PendingBookingModal />
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
              <Route path="/login" element={
                <Layout>
                <Login />
                </Layout>
                } />
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
              <Route
                path="/prcing-tenancy-cleaning"
                element={
                    <Layout>
                      <EndTenancy />
                    </Layout>
                }
              />
              <Route
                path="/prcing-carpet-cleaning"
                element={
                    <Layout>
                      <CarpetCleaning />
                    </Layout>
                }
              />
              <Route
                path="/prcing-upholstery-cleaning"
                element={
                    <Layout>
                      <Upholstery />
                    </Layout>
                }
              />
              <Route
                path="/regular-cleaning"
                element={
                    <Layout>
                      <RegularCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services-office-cleaning"
                element={
                    <Layout>
                      <OfficeCleaningPage />
                    </Layout>
                }
              />
              <Route
                path="/services/deep-cleaning"
                element={
                    <Layout>
                      <DeepCleaningService />
                    </Layout>
                }
              />
              <Route
                path="/services/same-day-cleaning"
                element={
                    <Layout>
                      <SameDayCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services/kitchen-deep-cleaning"
                element={
                    <Layout>
                      <KitchenDeepCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services/end-tenancy-cleaning"
                element={
                    <Layout>
                      <EndTenancyService />
                    </Layout>
                }
              />
              <Route
                path="/services/carpet-cleaning"
                element={
                    <Layout>
                      <CarpetService />
                    </Layout>
                }
              />
              <Route
                path="/services/rug-cleaning"
                element={
                    <Layout>
                      <RugCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services/move-in-cleaning"
                element={
                    <Layout>
                      <MoveInCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services/bathroom-cleaning"
                element={
                    <Layout>
                      <BathroomCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services/mattress-cleaning"
                element={
                    <Layout>
                      <MattressCleaning />
                    </Layout>
                }
              />
              <Route
                path="/services/spring-cleaning"
                element={
                    <Layout>
                      <SpringCleaning />
                    </Layout>
                }
              />
              <Route path="/checkout" element={
                <Checkout />
              } />
              <Route path="/register" element={
                <Layout>
                  <Signup />
                </Layout>
                } />
              <Route path="/test-stripe-processor" element={<StripeTestPage />} />
              <Route path="/stripe-card-payment" element={<StripeCardPaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
            </Routes>
          </main>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;

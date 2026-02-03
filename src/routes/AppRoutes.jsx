import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/Public/Login";
import SignUpPage from "../pages/Public/Signup";
import VerifyEmailPage from "../pages/Public/VerifyEmailPage"; 
import AuthCallback from "../pages/Public/AuthCallback";
import VerifyPage from "../pages/Public/VerifyPage";
import VerifyStatusPage from "../pages/Public/VerifyStatus";
import TiersPage from "../pages/Public/TiersPage";
import TierUpgradePage from "../pages/Public/TierUpgradePage";
import DashboardPage from "../pages/DashboardPage";
import AdminDashboard from "../pages/AdminDashboard/";
import AboutPage from "../pages/AboutPage/AboutPage";
import ServicePage from "../pages/ServicesPage/ServicesPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import ManagerRoute from "../routes/ManagerRoutes";
import ManagerDashboard from "../pages/ManagerDashboard/";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/tiers-upgrade" element={<TierUpgradePage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route
        path="/verify"
        element={
          <ProtectedRoute>
            <VerifyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verify/status"
        element={
          <ProtectedRoute>
            <VerifyStatusPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tiers"
        element={
          <ProtectedRoute>
            <TiersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ManagerRoute>
            <ManagerDashboard />
          </ManagerRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
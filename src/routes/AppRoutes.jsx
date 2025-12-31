import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/Public/Login";
import SignUpPage from "../pages/Public/Signup";
import VerifyEmailPage from "../pages/Public/VerifyEmailPage";
import AuthCallback from "../pages/Public/AuthCallback";
import OnboardingPage from "../pages/Public/OnboardingPage";
import DashboardPage from "../pages/DashboardPage";
import AdminDashboard from "../pages/AdminDashboard/";
import AboutPage from "../pages/AboutPage/AboutPage";
import ServicePage from "../pages/ServicesPage/ServicesPage";
import ContactPage from "../pages/ContactPage/ContactPage";

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
      <Route path="/auth/callback" element={<AuthCallback />} />


      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
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

    </Routes>
  );
};

export default AppRoutes;

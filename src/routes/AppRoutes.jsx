// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import DashboardPage from "../pages/DashboardPage/";
import AdminDashboard from "../pages/AdminDashboard";
import SignUpPage from "../pages/Public/Signup";
import LoginPage from "../pages/Public/Login";
import OnboardingPage from "../pages/Public/OnboardingPage";
import VerifyEmailPage from "../pages/Public/VerifyEmailPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Auth & Onboarding */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
    </Routes>
  );
};

export default AppRoutes;

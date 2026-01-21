import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import Overview from "../../components/Dashboard/Overview/Overview";
import ProfilePage from "../../components/Dashboard/ProfilePage";
import NotificationsPage from "../../components/Dashboard/Notifications";
import SupportPage from "../../components/Dashboard/Support";
import CommunityVerification from "../../components/Dashboard/CommunityVerification";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [activeSection, setActiveSection] = useState("Overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const renderSection = () => {
    switch (activeSection) {
      case "Overview":
        return <Overview />;
      case "Profile":
        return <ProfilePage />;
      case "Notifications":
        return <NotificationsPage />;
      case "Support":
        return <SupportPage />;
      case "Community":
        return <CommunityVerification />;
      default:
        return <Overview />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a1f44" }}>
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileOpen={mobileSidebarOpen}
        toggleMobile={setMobileSidebarOpen}
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, sm: "220px" },
          pt: "80px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <DashboardHeader toggleMobile={setMobileSidebarOpen} />
        <Box sx={{ px: { xs: 2, md: 4 }, pt: 2 }}>{renderSection()}</Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import Overview from "../../components/Dashboard/Overview/Overview";
import Investment from "../../components/Dashboard/Investment/Investment";
import MyInvestment from "../../components/Dashboard/MyInvestment/MyInvestement";
import Wallet from "../../components/Dashboard/Wallet";
import Loan from "../../components/Dashboard/Loan";
import CommunityVerification from "../../components/Dashboard/CommunityVerification";
import WithdrawalPage from "../../components/Dashboard/Withdraw";
import TransactionHistoryPage from "../../components/Dashboard/Transactions";
import ProfilePage from "../../components/Dashboard/ProfilePage";
import NotificationsPage from "../../components/Dashboard/Notifications";
import SupportPage from "../../components/Dashboard/Support";

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const [activeSection, setActiveSection] = useState("Overview");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Redirect logic: if not onboarded → go to onboarding
    useEffect(() => {
        if (loading) return;

        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        // If user has not completed onboarding → redirect to onboarding
        if (!user.user_metadata?.onboarded) {
            navigate("/onboarding", { replace: true });
            return;
        }
    }, [user, loading, navigate]);

    const renderSection = () => {
        switch (activeSection) {
            case "Overview":
                return <Overview />;
            case "Investment":
                return <Investment />;
            case "My Investment":
                return <MyInvestment />;
            case "Wallet":
                return <Wallet />;
            case "Loan":
                return <Loan />;
            case "Withdraw":
                return <WithdrawalPage />;
            case "Profile":
                return <ProfilePage />;
            case "Notifications":
                return <NotificationsPage />;
            case "Support":
                return <SupportPage />;
            case "Transactions":
                return <TransactionHistoryPage />;
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
                    pt: "80px", // padding top = header height
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
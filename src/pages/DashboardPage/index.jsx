import React, { useState } from "react";
import { Box } from "@mui/material";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import Overview from "../../components/Dashboard/Overview";
import Investment from "../../components/Dashboard/Investment";
import Wallet from "../../components/Dashboard/Wallet";
import Loan from "../../components/Dashboard/Loan";
import CommunityVerification from "../../components/Dashboard/CommunityVerification";

const DashboardPage = () => {
    const [activeSection, setActiveSection] = useState("Overview");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const renderSection = () => {
        switch (activeSection) {
            case "Overview":
                return <Overview />;
            case "Investment":
                return <Investment />;
            case "Wallet":
                return <Wallet />;
            case "Loan":
                return <Loan />;
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

import React, { useState } from "react";
import { Box } from "@mui/material";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminVerificationPage from "../../components/AdminDashboard/AdminVerificationPage";
import AdminTierUpgradeRequests from "../../components/AdminDashboard/TierUpgradeRequests";

const AdminDashboard = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("Verification");

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a1f44" }}>
            {/* Sidebar */}
            <AdminSidebar
                isMobileOpen={mobileSidebarOpen}
                toggleMobile={setMobileSidebarOpen}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    ml: { xs: 0, sm: "260px" },
                    pt: "80px",
                }}
            >
                <AdminHeader toggleMobile={setMobileSidebarOpen} />

                <Box sx={{ px: { xs: 2, md: 4 }, pt: 2 }}>
                    {activeSection === "Verification" && (
                        <AdminVerificationPage />
                    )}

                    {activeSection === "TierUpgrade" && (
                        <AdminTierUpgradeRequests />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

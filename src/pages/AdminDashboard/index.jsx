import React, { useState } from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminVerificationPage from "../../components/AdminDashboard/AdminVerificationPage";

const AdminDashboard = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a1f44" }}>
            
            {/* Sidebar (keep it but with ONLY verification item) */}
            <AdminSidebar
                activeSection="Verification"
                setActiveSection={() => {}}
                isMobileOpen={mobileSidebarOpen}
                toggleMobile={setMobileSidebarOpen}
            />

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    ml: { xs: 0, sm: "260px" },
                    pt: "80px",
                    transition: "all 0.3s ease",
                }}
            >
                <AdminHeader toggleMobile={setMobileSidebarOpen} />

                <Box sx={{ px: { xs: 2, md: 4 }, pt: 2 }}>
                    <AdminVerificationPage />
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

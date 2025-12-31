import React, { useState } from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import UserManagement from "../../components/AdminDashboard/UserManagement/UserManagement";
import Transactions from "../../components/AdminDashboard/Transaction/Transaction";
import Investments from "../../components/AdminDashboard/Investement/Investment";
import Loan from "../../components/AdminDashboard/Loan/Loan";
import Wallet from "../../components/AdminDashboard/Wallet/Wallet";
import Kyc from "../../components/AdminDashboard/Kyc/Kyc";
import Notification from "../../components/AdminDashboard/Notification/Notification";
import Setting from "../../components/AdminDashboard/Setting/Setting";
import Log from "../../components/AdminDashboard/Log/Log";
import AdminFundings from "../../components/AdminDashboard/Fundings";


const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("Users");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const renderSection = () => {
        switch (activeSection) {
            case "Users":
                return <UserManagement />;
                case "Funding":
                return <AdminFundings />;
            case "Transactions":
                return <Transactions />;
            case "Investments":
                return <Investments />;
            case "Loan":
                return <Loan />;
            case "Wallet":
                return <Wallet />;
            case "Kyc":
                return <Kyc />;
            case "Notification":
                return <Notification />;
            case "Setting":
                return <Setting />;
            case "Log":
                return <Log />;
            default:
                return <UserManagement />;
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a1f44" }}>
            <AdminSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isMobileOpen={mobileSidebarOpen}
                toggleMobile={setMobileSidebarOpen}
            />

            <Box
                sx={{
                    flex: 1,
                    ml: { xs: 0, sm: "260px" },
                    pt: "80px",
                    transition: "all 0.3s ease",
                }}
            >
                <AdminHeader toggleMobile={setMobileSidebarOpen} />
                <Box sx={{ px: { xs: 2, md: 4 }, pt: 2 }}>{renderSection()}</Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

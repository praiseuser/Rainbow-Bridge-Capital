import React from "react";
import { Drawer, Box, List, ListItemButton, Typography } from "@mui/material";
import {
    Users,
    CreditCard,
    Wallet,
    ShieldCheck,
} from "lucide-react";

const sidebarWidth = 260;

const AdminSidebar = ({ activeSection, setActiveSection, isMobileOpen, toggleMobile }) => {
    const menuItems = [
        { label: "Users", icon: <Users size={20} /> },
        { label: "Transactions", icon: <CreditCard size={20} /> },
        { label: "Funding", icon: <CreditCard size={20} /> },
        { label: "Investments", icon: <Wallet size={20} /> },
        { label: "Loan", icon: <ShieldCheck size={20} /> },
        { label: "Wallet", icon: <Wallet size={20} /> },
        { label: "Kyc", icon: <ShieldCheck size={20} /> },
        { label: "Notification", icon: <Users size={20} /> },
        { label: "Setting", icon: <CreditCard size={20} /> },
        { label: "Log", icon: <Wallet size={20} /> },
    ];

    const SidebarContent = (
        <Box
            sx={{
                width: sidebarWidth,
                height: "100%",
                background: "#091a35",
                color: "white",
                p: 2,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                }}
            >
                Admin Panel
            </Typography>

            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.label}
                        onClick={() => {
                            setActiveSection(item.label);
                            toggleMobile(false);
                        }}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 1.5,
                            p: "12px 16px",
                            borderRadius: 2,
                            background:
                                activeSection === item.label ? "rgba(255,255,255,0.15)" : "transparent",
                            "&:hover": {
                                background: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        {item.icon}
                        <Typography sx={{ fontSize: "15px", whiteSpace: "nowrap", marginTop: "3px" }}>
                            {item.label}
                        </Typography>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                open={isMobileOpen}
                onClose={() => toggleMobile(false)}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: sidebarWidth, background: "#091a35" },
                }}
            >
                {SidebarContent}
            </Drawer>

            {/* Desktop Sidebar */}
            <Box
                sx={{
                    width: sidebarWidth,
                    height: "100vh",
                    background: "#091a35",
                    position: "fixed",
                    display: { xs: "none", sm: "block" },
                }}
            >
                {SidebarContent}
            </Box>
        </>
    );
};

export default AdminSidebar;

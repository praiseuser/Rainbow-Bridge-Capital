import React, { useState } from "react";
import { Box, List, ListItem, IconButton, Tooltip, Typography } from "@mui/material";
import {
    People,
    AccountBalance,
    AttachMoney,
    BarChart,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const menuItems = [
    { title: "Users", icon: <People />, path: "/admin/users" },
    { title: "Investments", icon: <AttachMoney />, path: "/admin/investments" },
    { title: "Loans", icon: <AccountBalance />, path: "/admin/loans" },
    { title: "Analytics", icon: <BarChart />, path: "/admin/analytics" },
];

const AdminSidebar = () => {
    const location = useLocation();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Box sx={styles(theme, isDark, collapsed).container}>
            {/* Toggle Button */}
            <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={styles(theme, isDark, collapsed).toggleBtn}
            >
                {collapsed ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeft />}
            </IconButton>

            {/* Logo/Title */}
            {!collapsed && (
                <Typography sx={styles(theme, isDark, collapsed).logo}>
                    Admin Panel
                </Typography>
            )}

            {/* Menu Items */}
            <List sx={styles(theme, isDark, collapsed).list}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Tooltip
                            key={item.path}
                            title={collapsed ? item.title : ""}
                            placement="right"
                            arrow
                        >
                            <ListItem
                                component={Link}
                                to={item.path}
                                sx={{
                                    ...styles(theme, isDark, collapsed).menuItem,
                                    ...(isActive && styles(theme, isDark, collapsed).activeItem),
                                }}
                            >
                                {item.icon}
                                {!collapsed && (
                                    <Typography sx={styles(theme, isDark, collapsed).menuText}>
                                        {item.title}
                                    </Typography>
                                )}
                            </ListItem>
                        </Tooltip>
                    );
                })}
            </List>
        </Box>
    );
};

const styles = (theme, isDark, collapsed) => ({
    container: {
        width: collapsed ? "80px" : "260px",
        height: "100vh",
        background: isDark
            ? "linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)"
            : "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        padding: "20px 16px",
        transition: "width 0.3s ease",
        boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        zIndex: 1000,
    },

    toggleBtn: {
        color: "#fff",
        alignSelf: collapsed ? "center" : "flex-end",
        mb: 2,
        transition: "all 0.3s",
        "&:hover": {
            background: "rgba(255,255,255,0.1)",
            transform: "scale(1.1)",
        },
    },

    logo: {
        fontSize: "1.3rem",
        fontWeight: 800,
        color: "#fff",
        textAlign: "center",
        mb: 4,
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "12px",
    },

    list: {
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },

    menuItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: 2,
        padding: "14px 16px",
        borderRadius: "12px",
        color: "#fff",
        textDecoration: "none",
        transition: "all 0.3s",
        cursor: "pointer",
        "&:hover": {
            background: "rgba(255,255,255,0.2)",
            transform: "translateX(8px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        },
    },

    activeItem: {
        background: "rgba(255,255,255,0.25)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            width: "4px",
            height: "100%",
            background: theme.palette.accent.gold,
            borderRadius: "0 4px 4px 0",
        },
    },

    menuText: {
        fontSize: "0.95rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
    },
});

export default AdminSidebar;
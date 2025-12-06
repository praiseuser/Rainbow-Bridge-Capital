import React from "react";
import { Box, Typography, IconButton, Avatar, Chip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";

const AdminHeader = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box sx={styles(theme, isDark).container}>
            {/* Left Side - Title */}
            <Box sx={styles(theme, isDark).left}>
                <Typography sx={styles(theme, isDark).title}>Dashboard</Typography>
                <Chip
                    label="Admin"
                    size="small"
                    sx={styles(theme, isDark).badge}
                />
            </Box>

            {/* Right Side - Actions */}
            <Box sx={styles(theme, isDark).right}>
                <IconButton sx={styles(theme, isDark).iconBtn}>
                    <NotificationsIcon />
                </IconButton>
                <Avatar sx={styles(theme, isDark).avatar}>A</Avatar>
            </Box>
        </Box>
    );
};

const styles = (theme, isDark) => ({
    container: {
        height: "70px",
        background: isDark
            ? "rgba(26, 31, 58, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        position: "sticky",
        top: 0,
        zIndex: 999,
        boxShadow: isDark
            ? "0 2px 10px rgba(0,0,0,0.3)"
            : "0 2px 10px rgba(0,0,0,0.05)",
    },

    left: {
        display: "flex",
        alignItems: "center",
        gap: 2,
    },

    title: {
        fontSize: { xs: "1.2rem", md: "1.5rem" },
        fontWeight: 800,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },

    badge: {
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.7rem",
        height: "24px",
    },

    right: {
        display: "flex",
        alignItems: "center",
        gap: 2,
    },

    iconBtn: {
        color: theme.palette.text.primary,
        transition: "all 0.3s",
        "&:hover": {
            background: theme.palette.action.hover,
            transform: "scale(1.1)",
        },
    },

    avatar: {
        width: 40,
        height: 40,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
            transform: "scale(1.1)",
            boxShadow: `0 4px 15px ${theme.palette.primary.main}66`,
        },
    },
});

export default AdminHeader;
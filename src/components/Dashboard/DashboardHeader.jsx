import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import PanToolIcon from "@mui/icons-material/PanTool"; 

const DashboardHeader = ({ toggleMobile, userName = "User" }) => {
    return (
        <Box
            sx={{
                height: "80px",
                width: "100%",
                backgroundColor: "#1f2a38", // header color
                borderBottom: "1px solid #161f28",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 2, md: 4 },
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1100,
            }}
        >
            {/* Left Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: { xs: 0, md: "220px" }, 
                }}
            >
                <IconButton
                    sx={{ display: { xs: "block", md: "none" }, color: "#ffffff" }}
                    onClick={() => toggleMobile((prev) => !prev)}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: "flex", alignItems: "center", ml: { xs: 1, md: 2 } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#ffffff",
                            fontWeight: 600,
                        }}
                    >
                        Welcome, {userName}
                    </Typography>
                    <PanToolIcon sx={{ color: "#ffd700", ml: 1 }} />
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton sx={{ color: "#d0d7ff" }}>
                    <NotificationsIcon />
                </IconButton>
                <IconButton sx={{ color: "#d0d7ff" }}>
                    <AccountCircleIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default DashboardHeader;

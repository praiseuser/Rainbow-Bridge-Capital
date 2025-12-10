// src/components/Admin/AdminHeader.jsx
import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
    Badge,
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { Search,  Settings } from "@mui/icons-material";

const AdminHeader = ({ toggleMobile }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = (e) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            sx={{
                background: "#102542",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
                zIndex: 1200,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                }}
            >
                {/* Left Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Mobile Sidebar Toggle */}
                    <IconButton sx={{ display: { md: "none" } }} onClick={() => toggleMobile(true)}>
                        <MenuIcon color="white" size={26} />
                    </IconButton>

                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "#4f9bff",
                            letterSpacing: "0.6px",
                        }}
                    >
                        RBC Admin Panel
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "block" },
                        flex: 1,
                        mx: 3,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search anything..."
                        InputProps={{
                            sx: {
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "#90a4ae" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Right Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Notifications */}
                    <Badge color="error" variant="dot">
                        {/* <IconButton>
                            <Bell sx={{ color: "#fff" }} />
                        </IconButton> */}
                    </Badge>

                    {/* Settings */}
                    <IconButton>
                        <Settings sx={{ color: "#fff" }} />
                    </IconButton>

                    {/* Avatar + Menu */}
                    <Avatar
                        onClick={openMenu}
                        sx={{
                            width: 38,
                            height: 38,
                            cursor: "pointer",
                            border: "2px solid #4f9bff",
                        }}
                    />

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                        <MenuItem onClick={closeMenu}>Profile</MenuItem>
                        <MenuItem onClick={closeMenu}>Settings</MenuItem>
                        <MenuItem onClick={closeMenu}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;

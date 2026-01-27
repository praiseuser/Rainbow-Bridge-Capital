import React from "react";
import { Drawer, Box, List, ListItemButton, Typography } from "@mui/material";
import { ShieldCheck } from "lucide-react";

const sidebarWidth = 260;

const AdminSidebar = ({ isMobileOpen, toggleMobile }) => {
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
                }}
            >
                Admin Panel
            </Typography>

            <List>
                <ListItemButton
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: "12px 16px",
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.15)",
                        "&:hover": {
                            background: "rgba(255,255,255,0.2)",
                        },
                    }}
                >
                    <ShieldCheck size={20} />
                    <Typography sx={{ fontSize: "15px", whiteSpace: "nowrap" }}>
                        Verification Review
                    </Typography>
                </ListItemButton>
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
                    "& .MuiDrawer-paper": {
                        width: sidebarWidth,
                        background: "#091a35",
                    },
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

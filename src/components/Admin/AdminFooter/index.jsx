// src/components/Admin/AdminFooter.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const AdminFooter = () => {
    return (
        <Box
            sx={{
                height: { xs: "50px", md: "60px" },
                background: "#1e293b",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 3,
            }}
        >
            <Typography sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" }, opacity: 0.8 }}>
                © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
            </Typography>
        </Box>
    );
};

export default AdminFooter;

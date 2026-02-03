import React from "react";
import { Box, Typography } from "@mui/material";

const ManagerDashboard = () => {
    return (
        <Box p={4}>
            <Typography variant="h4" fontWeight={700} mb={2}>
                Manager Dashboard
            </Typography>

            <Typography color="gray">
                Welcome Manager 👋
                From here you will manage members, requests, and approvals.
            </Typography>
        </Box>
    );
};

export default ManagerDashboard;

// src/pages/AdminDashboard/index.jsx
import React from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { Typography, Box, Grid, Paper } from "@mui/material";

const stats = [
    { label: "Total Users", value: 1200 },
    { label: "Total Investments", value: "₦45,000,000" },
    { label: "Active Loans", value: 320 },
    { label: "Community Stats", value: "Stable" },
];

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Welcome, Admin!
            </Typography>
            <Grid container spacing={2}>
                {stats.map((stat, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Paper
                            sx={{
                                p: 2,
                                background: "#6366f1",
                                color: "#fff",
                                borderRadius: "12px",
                                textAlign: "center",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                            }}
                        >
                            <Typography variant="subtitle2">{stat.label}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {stat.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </AdminLayout>
    );
};

export default AdminDashboard;

import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Overview = () => {
    const cards = [
        { title: "Total Investment", value: "$12,500" },
        { title: "Wallet Balance", value: "$4,200" },
        { title: "Active Loans", value: "2" },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                backgroundColor: "#2e3b4c",
                p: 3,
                borderRadius: 2,
            }}
        >
            {cards.map((card) => (
                <Paper
                    key={card.title}
                    elevation={6}
                    sx={{
                        flex: "1 1 250px",
                        p: 3,
                        borderRadius: "15px",

                        color: "#fff",
                        transition: "all 0.3s ease",
                        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" },
                    }}
                >
                    <Typography sx={{ fontSize: "1rem", color: "#a0b0d0" }}>{card.title}</Typography>
                    <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: 1 }}>{card.value}</Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default Overview;

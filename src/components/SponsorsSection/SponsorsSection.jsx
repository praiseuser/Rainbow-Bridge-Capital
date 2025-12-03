import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const SponsorSection = () => {
    const sponsors = [
        { name: "LGBTQ+ Community", desc: "Pride. Equality. Financial Empowerment." },
        { name: "BDSM Community", desc: "Support. Trust. Community-Driven Growth." },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                py: 10,
                px: 2,
                background:
                    "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 35%, #e9d5ff 65%, #d8b4fe 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderTopLeftRadius: "40px",
                borderTopRightRadius: "40px",
            }}
        >
            <Typography
                sx={{
                    fontSize: "2.3rem",
                    fontWeight: 800,
                    mb: 5,
                    color: "#4a0072",
                    textAlign: "center",
                    letterSpacing: "0.5px",
                }}
            >
                Supported By Our Core Community Sponsors
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1100px",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 5,
                }}
            >
                {sponsors.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            height: 190,
                            borderRadius: "22px",
                            background: "rgba(255,255,255,0.55)",
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
                            transition: "0.35s",
                            "&:hover": {
                                transform: "translateY(-8px)",
                                boxShadow: "0 14px 32px rgba(0,0,0,0.15)",
                            },
                        }}
                    >
                        <CardContent
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    color: "#5a00a5",
                                    textAlign: "center",
                                }}
                            >
                                {item.name}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1.5,
                                    color: "#7c3aed",
                                    fontSize: "1rem",
                                    opacity: 0.85,
                                    textAlign: "center",
                                }}
                            >
                                {item.desc}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default SponsorSection;

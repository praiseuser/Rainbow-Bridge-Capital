import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CallToAction = () => {
    return (
        <Box
            sx={{
                width: "100%",
                py: 10,
                px: 3,
                position: "relative",
                overflow: "hidden",

                background: `
          radial-gradient(circle at 20% 20%, #ffffff 0%, #fdf8ff 30%, #fce7ff 60%, #f7d8ff 90%),
          linear-gradient(135deg, #fff7e6 0%, #f8e0ff 35%, #e8d4ff 100%)
        `,

                // Subtle golden highlight glow
                boxShadow: "inset 0 0 80px rgba(255, 215, 0, 0.25)",
            }}
        >
            {/* ✨ Floating Soft Particles */}
            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "5%",
                    width: 160,
                    height: 160,
                    background: "rgba(255,255,255,0.45)",
                    filter: "blur(50px)",
                    borderRadius: "50%",
                    animation: "float1 10s infinite ease-in-out",
                    "@keyframes float1": {
                        "0%": { transform: "translateY(0px)" },
                        "50%": { transform: "translateY(25px)" },
                        "100%": { transform: "translateY(0px)" },
                    },
                }}
            ></Box>

            <Box
                sx={{
                    position: "absolute",
                    bottom: "5%",
                    right: "10%",
                    width: 220,
                    height: 220,
                    background: "rgba(255, 230, 170, 0.35)",
                    filter: "blur(60px)",
                    borderRadius: "50%",
                    animation: "float2 12s infinite ease-in-out",
                    "@keyframes float2": {
                        "0%": { transform: "translateX(0px)" },
                        "50%": { transform: "translateX(35px)" },
                        "100%": { transform: "translateX(0px)" },
                    },
                }}
            ></Box>

            {/* MAIN CTA CONTAINER */}
            <Box
                sx={{
                    maxWidth: "850px",
                    mx: "auto",
                    textAlign: "center",
                    position: "relative",

                    // Glassmorphism Box
                    p: { xs: 4, md: 6 },
                    borderRadius: "28px",
                    background: "rgba(255, 255, 255, 0.55)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",

                    animation: "fadeIn 1.2s ease both",
                    "@keyframes fadeIn": {
                        from: { opacity: 0, transform: "translateY(30px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "1.9rem", md: "2.4rem" },
                        fontWeight: 800,
                        background: "linear-gradient(90deg, #b98500, #7d00b5, #b98500)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                    }}
                >
                    Be Part of Something Beautiful
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        color: "#5b008c",
                        opacity: 0.9,
                        maxWidth: "650px",
                        mx: "auto",
                        mb: 4,
                        lineHeight: 1.6,
                    }}
                >
                    Join our growing family and help support an inclusive community
                    powered by love, identity, and creativity.
                </Typography>

                {/* BUTTON */}
                <Button
                    variant="contained"
                    sx={{
                        px: 5,
                        py: 1.8,
                        fontSize: "1.1rem",
                        borderRadius: "14px",
                        textTransform: "none",
                        fontWeight: 700,

                        background:
                            "linear-gradient(90deg, #b98500 0%, #d899ff 50%, #b98500 100%)",

                        boxShadow: "0 8px 20px rgba(0,0,0,0.18)",

                        transition: "0.3s",
                        "&:hover": {
                            transform: "translateY(-4px) scale(1.03)",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                        },
                    }}
                >
                    Join The Movement
                </Button>
            </Box>
        </Box>
    );
};

export default CallToAction;

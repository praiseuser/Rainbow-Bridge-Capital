import React from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 6,
        mt: 6,
        background: "linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)",
        borderTop: "1px solid rgba(255,255,255,0.4)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          sx={{
            textAlign: "center",
            color: "#4b006e",
            fontWeight: 700,
            fontSize: "1.4rem",
            mb: 2,
          }}
        >
          Powered By LGBTQ + BDSM Sponsors
        </Typography>

        {/* Social Icons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mb: 3,
          }}
        >
          {[ 
            { icon: <Facebook size={22} />, link: "#" },
            { icon: <Twitter size={22} />, link: "#" },
            { icon: <Instagram size={22} />, link: "#" },
            { icon: <Youtube size={22} />, link: "#" },
            { icon: <Github size={22} />, link: "#" },
          ].map((item, i) => (
            <IconButton
              key={i}
              component="a"
              href={item.link}
              sx={{
                background: "rgba(8, 8, 8, 0.14)",
                backdropFilter: "blur(10px)",
                borderRadius: "14px",
                width: 45,
                height: 45,
                transition: "0.3s",
                "&:hover": {
                  background: "rgba(151, 103, 103, 0.8)",
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          sx={{
            textAlign: "center",
            color: "#6b21a8",
            fontSize: "0.95rem",
            opacity: 0.8,
          }}
        >
          © {new Date().getFullYear()} Your Brand — Built with Pride & Power 💜
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b21a8",
            fontSize: "0.85rem",
            opacity: 0.7,
            mt: 1,
          }}
        >
          Creating safe spaces, bold ideas, and premium digital experiences.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

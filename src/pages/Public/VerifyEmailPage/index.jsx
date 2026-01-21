import React from "react";
import { useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { Box, Button, Typography } from "@mui/material";

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        textAlign: "center",
      }}
    >
      <MailCheck size={60} color="#4ade80" />
      <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
        Verify Your Email
      </Typography>
      <Typography sx={{ mb: 3 }}>
        We sent a confirmation link to your email. Please check your inbox and click the link to continue.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </Button>
    </Box>
  );
};

export default VerifyEmailPage;
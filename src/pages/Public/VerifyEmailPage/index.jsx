import React from "react";
import { Box, Container, Typography, Paper, Stack } from "@mui/material";
import { MarkEmailRead } from "@mui/icons-material";

const VerifyEmailPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            },
          }}
        >
          <Box sx={{ p: { xs: 4, sm: 6 }, textAlign: "center" }}>
            <Stack spacing={3} alignItems="center">
              {/* Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                }}
              >
                <MarkEmailRead sx={{ fontSize: 40, color: "white" }} />
              </Box>

              {/* Title */}
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Verify Your Email
              </Typography>

              {/* Message */}
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                We've sent you a verification link. Please check your email and
                click the link to complete your registration.
              </Typography>

              {/* Footer */}
              <Box
                sx={{
                  mt: 2,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  width: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  You can close this page after verification ✨
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyEmailPage;
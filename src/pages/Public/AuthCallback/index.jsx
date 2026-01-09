import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import supabase from "../../../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Check for hash parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const errorDescription = hashParams.get('error_description');
        const type = hashParams.get('type');

        console.log('Auth callback params:', { type, hasAccessToken: !!accessToken, errorDescription });

        // Check for errors first
        if (errorDescription) {
          console.error("Auth error:", errorDescription);
          setError(errorDescription);
          setVerifying(false);
          setTimeout(() => navigate("/login", { replace: true }), 3000);
          return;
        }

        // Check if we have tokens (for email verification or magic link)
        if (accessToken && refreshToken) {
          console.log('Setting session with tokens...');
          
          // Set the session
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            console.error("Session error:", sessionError);
            setError("Failed to set session");
            setVerifying(false);
            setTimeout(() => navigate("/login", { replace: true }), 3000);
            return;
          }

          console.log('Session set successfully:', sessionData);

          // Get current user
          const { data: { user }, error: userError } = await supabase.auth.getUser();

          if (userError || !user) {
            console.error("User error:", userError);
            setError("Failed to get user");
            setVerifying(false);
            setTimeout(() => navigate("/login", { replace: true }), 3000);
            return;
          }

          console.log('User verified:', user.email);

          // Show success
          setVerifying(false);
          setVerified(true);

          // Navigate to onboarding after 2 seconds
          setTimeout(() => {
            navigate("/onboarding", { replace: true });
          }, 2000);

        } else {
          // No tokens found
          console.log('No access token found in callback');
          setError("No authentication data found");
          setVerifying(false);
          setTimeout(() => navigate("/login", { replace: true }), 3000);
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err.message || "Authentication failed");
        setVerifying(false);
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      }
    };

    handleAuth();
  }, [navigate]);

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
      <Paper
        elevation={24}
        sx={{
          borderRadius: 4,
          p: 6,
          textAlign: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        {verifying ? (
          <>
            <CircularProgress
              size={80}
              sx={{
                color: "#667eea",
                mb: 3,
              }}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Verifying your email...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait, finishing setup.
            </Typography>
          </>
        ) : error ? (
          <>
            <Box
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                mb: 3,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "scaleIn 0.5s ease-out",
                "@keyframes scaleIn": {
                  "0%": { transform: "scale(0)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            >
              <Error sx={{ fontSize: 60, color: "white" }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom color="error">
              Verification Failed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {error}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Redirecting to login...
            </Typography>
          </>
        ) : verified ? (
          <>
            <Box
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                mb: 3,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "scaleIn 0.5s ease-out",
                "@keyframes scaleIn": {
                  "0%": { transform: "scale(0)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            >
              <CheckCircle sx={{ fontSize: 60, color: "white" }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Email Verified!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Redirecting you to onboarding...
            </Typography>
          </>
        ) : null}
      </Paper>
    </Box>
  );
};

export default AuthCallback;
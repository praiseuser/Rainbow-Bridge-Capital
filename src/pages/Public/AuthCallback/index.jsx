import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import supabase from "../../../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Check for the hash parameters in the URL (token_type, access_token, etc.)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        // If it's an email verification
        if (type === 'signup' && accessToken) {
          // Set the session manually
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            console.error("Session error:", sessionError);
            navigate("/login", { replace: true });
            return;
          }

          // Verify user is authenticated
          const { data: { user }, error: userError } = await supabase.auth.getUser();

          if (userError || !user) {
            console.error("User error:", userError);
            navigate("/login", { replace: true });
            return;
          }

          // Show success animation
          setVerifying(false);
          setVerified(true);

          // Wait 2 seconds then navigate to onboarding
          setTimeout(() => {
            navigate("/onboarding", { replace: true });
          }, 2000);

        } else {
          // No valid verification found, go to login
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login", { replace: true });
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
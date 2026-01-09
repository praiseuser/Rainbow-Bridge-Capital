import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import supabase from "../../../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (session?.user?.email_confirmed_at || session?.user?.confirmed_at) {
          setStatus("success");
          setTimeout(() => {
            navigate("/onboarding", { replace: true });
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage("Email not confirmed yet.");
          setTimeout(() => navigate("/login", { replace: true }), 3000);
        }
      } else if (event === "SIGN_IN_FAILED" || event === "USER_UPDATED") {
        // Handle potential errors
        setStatus("error");
        setErrorMessage("Authentication failed.");
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      }
    });

    // Optional: Try to get current session in case it's already processed
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session error:", error);
        setStatus("error");
        setErrorMessage(error.message);
        setTimeout(() => navigate("/login", { replace: true }), 3000);
        return;
      }

      if (data.session?.user?.email_confirmed_at) {
        setStatus("success");
        setTimeout(() => navigate("/onboarding", { replace: true }), 2000);
      } else if (data.session) {
        // Signed in but not confirmed
        setStatus("error");
        setErrorMessage("Please confirm your email.");
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      }
    };

    checkSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
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
      <Paper elevation={24} sx={{ borderRadius: 4, p: 6, textAlign: "center", maxWidth: 400, width: "100%" }}>
        {status === "verifying" && (
          <>
            <CircularProgress size={80} sx={{ color: "#667eea", mb: 3 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Verifying your email...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we confirm your account.
            </Typography>
          </>
        )}

        {status === "success" && (
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
              }}
            >
              <CheckCircle sx={{ fontSize: 60, color: "white" }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Redirecting to onboarding...
            </Typography>
          </>
        )}

        {status === "error" && (
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
              }}
            >
              <Error sx={{ fontSize: 60, color: "white" }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom color="error">
              Verification Failed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {errorMessage || "Something went wrong."}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Redirecting to login...
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AuthCallback;
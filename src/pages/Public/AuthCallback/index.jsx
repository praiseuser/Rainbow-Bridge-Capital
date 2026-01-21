import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import supabase from "../../../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          console.error("No session found:", error);
          navigate("/login");
          return;
        }
        await supabase.auth.updateUser({
          data: { 
            just_verified: true,
            onboarded: false  
          }
        });

        setVerifying(false);
        setVerified(true);

        setTimeout(() => {
          navigate("/verify", { replace: true });
        }, 2000);

      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login");
      }
    };

    handleEmailVerification();
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
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          p: 6,
          textAlign: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        {verifying ? (
          <>
            <CircularProgress size={80} sx={{ color: "#667eea", mb: 3 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Verifying your email...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait
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
              Redirecting to verification...
            </Typography>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default AuthCallback;
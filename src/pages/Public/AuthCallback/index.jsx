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
                // Let Supabase handle everything
                const { data, error } = await supabase.auth.getSessionFromUrl({
                    storeSession: true,
                });

                if (error) {
                    setError(error.message);
                    setVerifying(false);
                    setTimeout(() => navigate("/login", { replace: true }), 3000);
                    return;
                }

                // Session is now guaranteed
                const { data: userData, error: userError } =
                    await supabase.auth.getUser();

                if (userError || !userData?.user) {
                    setError("User not found after verification");
                    setVerifying(false);
                    setTimeout(() => navigate("/login", { replace: true }), 3000);
                    return;
                }

                // SUCCESS
                setVerifying(false);
                setVerified(true);

                setTimeout(() => {
                    navigate("/onboarding", { replace: true });
                }, 2000);
            } catch (err) {
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
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../../supabase";
import { CircularProgress } from "@mui/material";

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state?.name || "there";

    const [checking, setChecking] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const checkVerification = async () => {
            const { data } = await supabase.auth.getUser();

            if (data?.user?.email_confirmed_at) {
                setVerified(true);

                // small delay for UX
                setTimeout(() => {
                    navigate("/onboarding");
                }, 2000);
            }

            setChecking(false);
        };

        checkVerification();
    }, [navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {checking ? (
                    <>
                        <CircularProgress />
                        <p style={styles.text}>Checking verification…</p>
                    </>
                ) : verified ? (
                    <>
                        <h2 style={styles.success}>✅ Email Verified</h2>
                        <p style={styles.text}>Redirecting you to onboarding…</p>
                    </>
                ) : (
                    <>
                        <h2 style={styles.title}>Verify your email</h2>
                        <p style={styles.text}>
                            Hi <strong>{name}</strong>, please check your inbox and click the
                            confirmation link.
                        </p>
                        <p style={styles.sub}>
                            You can leave this page open — once verified, we’ll continue.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0fdf4",
    },
    card: {
        background: "#fff",
        padding: "40px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        maxWidth: "420px",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "10px",
    },
    success: {
        color: "#38a169",
        fontSize: "1.6rem",
        marginBottom: "10px",
    },
    text: {
        fontSize: "1rem",
        color: "#374151",
    },
    sub: {
        marginTop: "10px",
        fontSize: "0.9rem",
        color: "#6b7280",
    },
};

export default VerifyEmailPage;

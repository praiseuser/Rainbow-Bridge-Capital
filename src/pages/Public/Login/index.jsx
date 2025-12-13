import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../../../supabase";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { styles, keyframes } from "./styles";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.showSuccessToast) {
            toast.success("Account created successfully!", {
                style: { background: "#38a169", color: "#fff" }
            });
        }
    }, [location.state]);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill all fields", { style: { background: "#e53e3e", color: "#fff" } });
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        if (error) {
            toast.error(error.message, { style: { background: "#e53e3e", color: "#fff" } });
            return;
        }

        toast.success("Welcome back!", { style: { background: "#38a169", color: "#fff" } });
        navigate("/dashboard");
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-right" />
            <style>{keyframes}</style>

            <div style={styles.bgOrb1} />
            <div style={styles.bgOrb2} />
            <div style={styles.bgOrb3} />

            <div style={styles.formWrapper}>
                <div style={styles.formCard}>
                    <div style={styles.header}>
                        <div style={styles.logoWrapper}>
                            <div style={styles.logo}>🌈</div>
                        </div>
                        <h1 style={styles.title}>Welcome Back</h1>
                        <p style={styles.subtitle}>Sign in to your account</p>
                    </div>

                    <div style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <div style={styles.inputWrapper}>
                                <Mail size={20} color="#6b7280" style={styles.icon} />
                                <input
                                    style={styles.input}
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={20} color="#6b7280" style={styles.icon} />
                                <input
                                    style={styles.input}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                />
                                <button
                                    style={styles.eyeBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                >
                                    {showPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
                                </button>
                            </div>
                        </div>

                        <div style={styles.forgotPassword}>
                            <Link to="/forgot-password" style={styles.forgotLink}>
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            style={{ ...styles.submitBtn, ...(loading && styles.submitBtnLoading) }}
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                <>
                                    <span style={styles.submitBtnText}>Sign In</span>
                                    <LogIn size={20} />
                                </>
                            )}
                        </button>

                        <div style={styles.divider}>
                            <div style={styles.dividerLine} />
                            <span style={styles.dividerText}>or</span>
                            <div style={styles.dividerLine} />
                        </div>

                        <div style={styles.signupPrompt}>
                            <span style={styles.signupText}>Don't have an account?</span>
                            <Link to="/signup" style={styles.signupLink}>
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>

                <div style={styles.features}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>💎</div>
                        <div style={styles.featureText}>Trusted Platform</div>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🚀</div>
                        <div style={styles.featureText}>Fast Access</div>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🔐</div>
                        <div style={styles.featureText}>100% Secure</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, TrendingUp, ArrowRight, Shield, Zap, Award } from "lucide-react";
import toast from "react-hot-toast";
import supabase from "../../../supabase";
import { checkUserBlocked } from "../../../utilities/checkUserBlocked";
import { styles } from "./styles";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.showSuccessToast) {
            toast.success("Account created successfully!");
        }
    }, [location.state]);

    const handleLogin = async () => {
        if (!email || !password) {
            return toast.error("Please fill all fields");
        }

        setLoading(true);

        try {
            // 1️⃣ Login
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const userId = data.user.id;

            // 2️⃣ Check if user is blocked
            const blockCheck = await checkUserBlocked(userId);
            if (blockCheck.blocked) {
                toast.error(blockCheck.message, { duration: 5000 });
                await supabase.auth.signOut();
                setLoading(false);
                return;
            }

            // 3️⃣ FETCH ROLE FROM profiles TABLE (🔥 FIX 🔥)
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("user_id", userId)
                .single();

            if (profileError) throw profileError;

            toast.success("Welcome back!");

            // 4️⃣ Redirect based on DB role
            if (profile?.role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }

        } catch (err) {
            console.error("Login error:", err);
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <>
            <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
        
        .input:focus { border-color: #6366f1; background: white; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .eye-btn:hover { color: #6366f1; }
        .button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(99, 102, 241, 0.5); }
        .button:disabled { opacity: 0.6; cursor: not-allowed; }
        .link:hover, .forgot-link:hover { text-decoration: underline; }
        .feature:hover { background: rgba(255,255,255,0.95); transform: translateY(-2px); transition: all 0.3s ease; }
        
        @media (max-width: 500px) {
          .card { padding: 30px 24px; }
          .features { grid-template-columns: 1fr; }
        }
      `}</style>

            <div style={styles.page}>
                <div style={styles.bgEffect} />

                <div style={styles.container}>
                    <div style={styles.logo}>
                        <TrendingUp size={32} color="white" />
                    </div>

                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Sign in to your account</p>

                    <div className="card" style={styles.card}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <div style={styles.inputWrapper}>
                                <Mail size={18} style={styles.inputIcon} />
                                <input
                                    className="input"
                                    style={styles.input}
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={18} style={styles.inputIcon} />
                                <input
                                    className="input"
                                    style={{ ...styles.input, ...styles.inputPassword }}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    className="eye-btn"
                                    style={styles.eyeBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <span
                            className="forgot-link"
                            style={styles.forgotLink}
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot password?
                        </span>

                        <button
                            className="button"
                            style={styles.button}
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                            {!loading && <ArrowRight size={20} />}
                        </button>

                        <div style={styles.divider}>
                            <div style={styles.dividerLine} />
                            <span style={styles.dividerText}>or</span>
                            <div style={styles.dividerLine} />
                        </div>

                        <div style={styles.footer}>
                            Don't have an account?{" "}
                            <span
                                className="link"
                                style={styles.link}
                                onClick={() => navigate("/signup")}
                            >
                                Create Account
                            </span>
                        </div>
                    </div>

                    <div className="features" style={styles.features}>
                        <div className="feature" style={styles.feature}>
                            <Shield size={28} style={styles.featureIcon} />
                            <div style={styles.featureText}>Trusted Platform</div>
                        </div>
                        <div className="feature" style={styles.feature}>
                            <Zap size={28} style={styles.featureIcon} />
                            <div style={styles.featureText}>Fast Access</div>
                        </div>
                        <div className="feature" style={styles.feature}>
                            <Award size={28} style={styles.featureIcon} />
                            <div style={styles.featureText}>100% Secure</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
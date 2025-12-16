import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../../../supabase";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { styles, keyframes } from "./styles";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleSignUp = async () => {
  if (!name || !email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${window.location.origin}/verify-email`,
    },
  });

  setLoading(false);

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Check your email to verify your account");

  // ✅ GO TO VERIFY PAGE — NOT ONBOARDING
  navigate("/verify-email", { state: { email, name } });
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
            <h1 style={styles.title}>Create Account</h1>
            <p style={styles.subtitle}>Join Rainbow Bridge Capital today</p>
          </div>

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={20} color="#6b7280" style={styles.icon} />
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              style={{ ...styles.submitBtn, ...(loading && styles.submitBtnLoading) }}
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                <>
                  <span style={styles.submitBtnText}>Create Account</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <div style={styles.featureText}>Secure & Encrypted</div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <div style={styles.featureText}>Quick Setup</div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <div style={styles.featureText}>Get Started Free</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

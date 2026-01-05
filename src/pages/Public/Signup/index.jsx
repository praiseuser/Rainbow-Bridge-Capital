import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, TrendingUp, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import supabase from "../../../supabase";
import { styles } from "./styles";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      return toast.error("Please fill all fields");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success("Account created! Check your email to verify.");
      navigate("/verify-email");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSignUp();
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
        .link:hover { text-decoration: underline; }
        
        @media (max-width: 500px) {
          .card { padding: 30px 24px; }
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.bgEffect} />
        
        <div style={styles.container}>
          <div style={styles.logo}>
            <TrendingUp size={32} color="white" />
          </div>
          
          <h1 style={styles.title}>Join Our Platform</h1>
          <p style={styles.subtitle}>Start your investment journey today</p>
          
          <div className="card" style={styles.card}>
            <div style={styles.badge}>
              <Sparkles size={14} />
              Free Forever
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.inputIcon} />
                <input
                  className="input"
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.inputIcon} />
                <input
                  className="input"
                  style={styles.input}
                  type="email"
                  placeholder="Enter your email"
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
                  style={{...styles.input, ...styles.inputPassword}}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
              <p style={styles.hint}>Must be at least 6 characters</p>
            </div>

            <button
              className="button"
              style={styles.button}
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight size={20} />}
            </button>

            <div style={styles.benefits}>
              <div style={styles.benefit}>
                <CheckCircle size={18} style={styles.benefitIcon} />
                <span style={styles.benefitText}>Instant wallet creation</span>
              </div>
              <div style={styles.benefit}>
                <CheckCircle size={18} style={styles.benefitIcon} />
                <span style={styles.benefitText}>Secure investment platform</span>
              </div>
              <div style={styles.benefit}>
                <CheckCircle size={18} style={styles.benefitIcon} />
                <span style={styles.benefitText}>24/7 customer support</span>
              </div>
            </div>

            <div style={styles.footer}>
              Already have an account?{" "}
              <span 
                className="link"
                style={styles.link}
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </div>
          </div>

          <p style={styles.terms}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
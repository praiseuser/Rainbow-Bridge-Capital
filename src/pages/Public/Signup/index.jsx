import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Card,
  Fade,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  TrendingUp,
  CheckCircle,
  ArrowForward,
} from "@mui/icons-material";
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
          data: {
            full_name: name,
          },
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
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      {/* Background Decorations */}
      <Box sx={styles.backgroundDecoration}>
        <Box sx={styles.circle1} />
        <Box sx={styles.circle2} />
        <Box sx={styles.circle3} />
      </Box>

      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Box sx={styles.contentWrapper}>
            {/* Logo/Brand Section */}
            <Box sx={styles.brandSection}>
              <Box sx={styles.logoWrapper}>
                <TrendingUp sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h4" sx={styles.brandTitle}>
                Join Our Platform
              </Typography>
              <Typography variant="body1" sx={styles.brandSubtitle}>
                Start your investment journey today
              </Typography>
            </Box>

            {/* Signup Card */}
            <Card sx={styles.signupCard}>
              <Box sx={styles.cardHeader}>
                <Typography variant="h5" sx={styles.cardTitle}>
                  Create Account
                </Typography>
                <Chip
                  icon={<CheckCircle />}
                  label="Free Forever"
                  sx={styles.freeBadge}
                  size="small"
                />
              </Box>

              <Box sx={styles.formContainer}>
                {/* Full Name Input */}
                <Box sx={styles.inputWrapper}>
                  <Typography variant="body2" sx={styles.inputLabel}>
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={styles.inputIcon} />
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.textField}
                  />
                </Box>

                {/* Email Input */}
                <Box sx={styles.inputWrapper}>
                  <Typography variant="body2" sx={styles.inputLabel}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={styles.inputIcon} />
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.textField}
                  />
                </Box>

                {/* Password Input */}
                <Box sx={styles.inputWrapper}>
                  <Typography variant="body2" sx={styles.inputLabel}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={styles.inputIcon} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={styles.visibilityButton}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.textField}
                  />
                  <Typography variant="caption" sx={styles.passwordHint}>
                    Must be at least 6 characters
                  </Typography>
                </Box>

                {/* Sign Up Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSignUp}
                  disabled={loading}
                  endIcon={loading ? null : <ArrowForward />}
                  sx={styles.signupButton}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Benefits List */}
                <Box sx={styles.benefitsList}>
                  <Box sx={styles.benefitItem}>
                    <CheckCircle sx={styles.benefitIcon} />
                    <Typography variant="body2" sx={styles.benefitText}>
                      Instant wallet creation
                    </Typography>
                  </Box>
                  <Box sx={styles.benefitItem}>
                    <CheckCircle sx={styles.benefitIcon} />
                    <Typography variant="body2" sx={styles.benefitText}>
                      Secure investment platform
                    </Typography>
                  </Box>
                  <Box sx={styles.benefitItem}>
                    <CheckCircle sx={styles.benefitIcon} />
                    <Typography variant="body2" sx={styles.benefitText}>
                      24/7 customer support
                    </Typography>
                  </Box>
                </Box>

                {/* Login Link */}
                <Box sx={styles.loginLinkContainer}>
                  <Typography variant="body2" sx={styles.loginText}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.loginLink}>
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Footer */}
            <Typography variant="caption" sx={styles.footer}>
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default SignUpPage;
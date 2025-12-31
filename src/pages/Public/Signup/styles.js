export const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: { xs: 4, sm: 6 },
    px: 2,
    position: "relative",
    overflow: "hidden",
  },

  backgroundDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },

  circle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    animation: "float 20s ease-in-out infinite",
    "@keyframes float": {
      "0%, 100%": { transform: "translate(0, 0) scale(1)" },
      "50%": { transform: "translate(-50px, 50px) scale(1.1)" },
    },
  },

  circle2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
    animation: "float 25s ease-in-out infinite reverse",
  },

  circle3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
    animation: "pulse 15s ease-in-out infinite",
    "@keyframes pulse": {
      "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
      "50%": { transform: "translate(-50%, -50%) scale(1.2)" },
    },
  },

  contentWrapper: {
    position: "relative",
    zIndex: 2,
  },

  brandSection: {
    textAlign: "center",
    mb: 4,
  },

  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 3,
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    animation: "bounce 2s ease-in-out infinite",
    "@keyframes bounce": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },

  brandTitle: {
    color: "white",
    fontWeight: 800,
    mb: 1,
    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontSize: { xs: "1.75rem", sm: "2rem" },
  },

  brandSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: { xs: 14, sm: 16 },
  },

  signupCard: {
    borderRadius: 4,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
    background: "white",
  },

  cardHeader: {
    p: 3,
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderBottom: "2px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontWeight: 700,
    color: "#1e293b",
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  },

  freeBadge: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    fontWeight: 700,
    "& .MuiChip-icon": {
      color: "white",
    },
  },

  formContainer: {
    p: { xs: 3, sm: 4 },
  },

  inputWrapper: {
    mb: 3,
  },

  inputLabel: {
    fontWeight: 700,
    color: "#1e293b",
    mb: 1,
    fontSize: { xs: 13, sm: 14 },
  },

  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#f8fafc",
      border: "2px solid #e2e8f0",
      transition: "all 0.3s ease",
      "& fieldset": { border: "none" },
      "&:hover": {
        backgroundColor: "#f1f5f9",
        border: "2px solid #cbd5e1",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
        border: "2px solid #667eea",
        boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
      },
    },
    "& input": {
      color: "#1e293b",
      fontSize: { xs: 14, sm: 15 },
      py: 1.5,
    },
  },

  inputIcon: {
    color: "#667eea",
    fontSize: 22,
  },

  visibilityButton: {
    color: "#64748b",
    "&:hover": {
      color: "#667eea",
    },
  },

  passwordHint: {
    color: "#64748b",
    mt: 0.5,
    fontSize: { xs: 11, sm: 12 },
  },

  signupButton: {
    py: { xs: 1.5, sm: 1.8 },
    borderRadius: 2,
    fontWeight: 700,
    fontSize: { xs: 15, sm: 16 },
    textTransform: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    mb: 3,
    "&:hover": {
      background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
      boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      background: "#cbd5e1",
    },
  },

  benefitsList: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
    mb: 3,
  },

  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },

  benefitIcon: {
    color: "#10b981",
    fontSize: 20,
  },

  benefitText: {
    color: "#475569",
    fontWeight: 500,
    fontSize: { xs: 13, sm: 14 },
  },

  loginLinkContainer: {
    textAlign: "center",
  },

  loginText: {
    color: "#64748b",
    fontSize: { xs: 13, sm: 14 },
  },

  loginLink: {
    color: "#667eea",
    fontWeight: 700,
    textDecoration: "none",
  },

  footer: {
    display: "block",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    mt: 3,
    fontSize: { xs: 11, sm: 12 },
  },
};
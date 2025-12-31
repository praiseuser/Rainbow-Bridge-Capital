export const styles = {
  dialogPaper: {
    borderRadius: 4,
    background: "white",
    overflow: "hidden",
    boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
  },

  header: {
    position: "relative",
    p: 4,
    pb: 5,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    },
  },

  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transform: "rotate(90deg)",
    },
    transition: "all 0.3s ease",
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    position: "relative",
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },

  headerTitle: {
    color: "white",
    fontWeight: 800,
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  },

  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: 500,
    fontSize: { xs: 13, sm: 14 },
  },

  contentSection: {
    p: { xs: 3, sm: 4 },
  },

  sectionLabel: {
    fontWeight: 700,
    color: "#1e293b",
    fontSize: { xs: 13, sm: 14 },
    mb: 1,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  selectField: {
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
        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      },
    },
  },

  addressCard: {
    mb: 3,
    p: 3,
    borderRadius: 3,
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
  },

  networkChip: {
    backgroundColor: "#667eea",
    color: "white",
    fontWeight: 700,
    fontSize: 11,
  },

  addressBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    p: 2,
    borderRadius: 2,
    backgroundColor: "white",
    border: "2px solid #e2e8f0",
    mb: 2,
  },

  addressText: {
    flex: 1,
    fontSize: { xs: 12, sm: 13 },
    fontWeight: 600,
    color: "#1e293b",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },

  copyButton: {
    backgroundColor: "#f1f5f9",
    "&:hover": {
      backgroundColor: "#e2e8f0",
    },
  },

  warningAlert: {
    borderRadius: 2,
    backgroundColor: "#fef3c7",
    border: "2px solid #fbbf24",
    "& .MuiAlert-icon": {
      color: "#f59e0b",
    },
  },

  amountInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      fontSize: { xs: 20, sm: 24 },
      fontWeight: 700,
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
        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      },
    },
    "& input": {
      color: "#1e293b",
      py: 2,
    },
  },

  currencySymbol: {
    fontSize: { xs: 20, sm: 24 },
    fontWeight: 800,
    color: "#667eea",
  },

  txHashInput: {
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
        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      },
    },
  },

  helpText: {
    display: "block",
    color: "#64748b",
    fontSize: 12,
    mt: 0.5,
  },

  securityBadge: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 2,
    mb: 3,
    borderRadius: 2,
    backgroundColor: "#f0fdf4",
    border: "2px solid #86efac",
  },

  securityText: {
    color: "#15803d",
    fontWeight: 600,
    fontSize: 13,
  },

  cancelButton: {
    py: 1.8,
    borderRadius: 2,
    fontWeight: 700,
    fontSize: 15,
    textTransform: "none",
    borderColor: "#e2e8f0",
    color: "#64748b",
    "&:hover": {
      borderColor: "#cbd5e1",
      backgroundColor: "#f8fafc",
    },
  },

  submitButton: {
    py: 1.8,
    borderRadius: 2,
    fontWeight: 700,
    fontSize: 15,
    textTransform: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    "&:hover": {
      background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
      boxShadow: "0 6px 16px rgba(102, 126, 234, 0.5)",
    },
    "&:disabled": {
      background: "#cbd5e1",
      color: "#94a3b8",
    },
  },
};
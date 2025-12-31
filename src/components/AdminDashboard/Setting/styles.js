export const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    py: { xs: 3, sm: 4, md: 6 },
    px: { xs: 2, sm: 3 },
  },

  headerSection: {
    mb: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  iconWrapper: {
    width: { xs: 56, sm: 64 },
    height: { xs: 56, sm: 64 },
    borderRadius: "16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
  },

  pageTitle: {
    fontWeight: 800,
    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
    fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
  },

  pageSubtitle: {
    color: "#64748b",
    fontSize: { xs: 14, sm: 16 },
    mt: 0.5,
  },

  adminBadge: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    fontWeight: 700,
    px: 2,
    py: 0.5,
    "& .MuiChip-icon": {
      color: "white",
    },
  },

  settingCard: {
    height: "100%",
    borderRadius: 3,
    border: "2px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      borderColor: "#667eea",
    },
  },

  settingHeader: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },

  settingIconBox: (color) => ({
    width: 56,
    height: 56,
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 4px 12px ${color}40`,
    flexShrink: 0,
  }),

  settingTitle: {
    fontWeight: 700,
    color: "#1e293b",
    fontSize: { xs: 16, sm: 18 },
  },

  settingDescription: {
    color: "#64748b",
    fontSize: { xs: 12, sm: 13 },
  },

  customSwitch: {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#667eea",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#667eea",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#cbd5e1",
    },
  },

  inputField: {
    mt: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      fontSize: { xs: 16, sm: 18 },
      fontWeight: 600,
      backgroundColor: "#f8fafc",
      border: "2px solid #e2e8f0",
      transition: "all 0.3s ease",
      "& fieldset": { border: "none" },
      "&:hover": {
        backgroundColor: "#f1f5f9",
        border: "2px solid #667eea",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
        border: "2px solid #667eea",
        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
      },
    },
    "& input": {
      color: "#1e293b",
      py: 1.5,
    },
  },

  currencySymbol: {
    fontSize: { xs: 18, sm: 20 },
    fontWeight: 700,
    color: "#667eea",
  },

  percentSymbol: {
    fontSize: { xs: 18, sm: 20 },
    fontWeight: 700,
    color: "#667eea",
  },

  saveButtonContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
  },

  saveButton: {
    py: { xs: 1.5, sm: 2 },
    px: { xs: 4, sm: 6 },
    borderRadius: 3,
    fontWeight: 700,
    fontSize: { xs: 15, sm: 17 },
    textTransform: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    minWidth: { xs: "100%", sm: 300 },
    "&:hover": {
      background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
      boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      background: "#cbd5e1",
      color: "#94a3b8",
    },
  },
};

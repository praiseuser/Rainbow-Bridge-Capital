export const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    py: { xs: 4, sm: 6 },
  },

  header: {
    textAlign: "center",
    mb: { xs: 4, sm: 5 },
  },

  pageTitle: {
    fontWeight: 800,
    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
    mb: 1,
  },

  pageSubtitle: {
    color: "#64748b",
    fontSize: { xs: 15, sm: 17 },
    fontWeight: 500,
  },

  formCard: {
    borderRadius: 4,
    border: "2px solid #e2e8f0",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  formCardHeader: {
    p: 3,
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  formIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  formCardTitle: {
    color: "white",
    fontWeight: 700,
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  },

  balanceBox: {
    textAlign: "center",
    p: 3,
    mb: 3,
    borderRadius: 3,
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    border: "2px solid #e2e8f0",
  },

  balanceLabel: {
    color: "#64748b",
    fontWeight: 600,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    mb: 1,
  },

  balanceAmount: {
    fontWeight: 800,
    color: "#1e293b",
    letterSpacing: "-0.5px",
  },

  fieldLabel: {
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
        border: "2px solid #ef4444",
        boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
      },
    },
  },

  coinIcon: {
    width: 32,
    height: 32,
    borderRadius: "8px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 700,
    color: "white",
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
        border: "2px solid #ef4444",
        boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
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
    color: "#ef4444",
  },

  addressInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#f8fafc",
      border: "2px solid #e2e8f0",
      transition: "all 0.3s ease",
      fontFamily: "monospace",
      "& fieldset": { border: "none" },
      "&:hover": {
        backgroundColor: "#f1f5f9",
        border: "2px solid #cbd5e1",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
        border: "2px solid #ef4444",
        boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
      },
    },
  },

  warningAlert: {
    mb: 3,
    borderRadius: 2,
    backgroundColor: "#fef3c7",
    border: "2px solid #fbbf24",
    "& .MuiAlert-icon": {
      color: "#f59e0b",
    },
  },

  submitButton: {
    py: 2,
    borderRadius: 2,
    fontWeight: 700,
    fontSize: 16,
    textTransform: "none",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
    "&:hover": {
      background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
      boxShadow: "0 6px 16px rgba(239, 68, 68, 0.5)",
    },
    "&:disabled": {
      background: "#cbd5e1",
      color: "#94a3b8",
    },
  },

  historyCard: {
    borderRadius: 4,
    border: "2px solid #e2e8f0",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  historyHeader: {
    p: 3,
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
  },

  historyIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },

  historyTitle: {
    color: "#1e293b",
    fontWeight: 700,
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  },

  emptyState: {
    textAlign: "center",
    py: 6,
    px: 3,
  },

  withdrawalsList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  withdrawalItem: {
    borderRadius: 3,
    border: "2px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      borderColor: "#cbd5e1",
    },
  },

  withdrawalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    flexWrap: "wrap",
    gap: 2,
  },

  withdrawalCoinIcon: {
    width: 40,
    height: 40,
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 700,
    color: "white",
  },

  withdrawalCoin: {
    fontWeight: 700,
    color: "#1e293b",
    fontSize: 16,
  },

  withdrawalDate: {
    fontSize: 13,
    color: "#64748b",
  },

  statusChip: (config) => ({
    backgroundColor: config.bgColor,
    color: config.color,
    fontWeight: 700,
    fontSize: 13,
    px: 1.5,
    "& .MuiChip-icon": {
      color: config.color,
    },
  }),

  withdrawalDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },

  detailLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: 600,
  },

  detailValue: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: 700,
  },

  detailValueAddress: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: 600,
    fontFamily: "monospace",
    wordBreak: "break-all",
    textAlign: "right",
  },

  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    px: 2,
  },
};
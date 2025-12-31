export const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    py: { xs: 3, sm: 4, md: 6 },
    px: { xs: 2, sm: 3 },
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    px: 2,
  },

  loader: {
    color: "#667eea",
  },

  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    px: 2,
  },

  heroSection: {
    position: "relative",
    textAlign: "center",
    py: { xs: 3, sm: 4, md: 6 },
    overflow: "hidden",
    px: { xs: 2, sm: 0 },
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
  },

  heroBadge: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontWeight: 700,
    fontSize: { xs: 12, sm: 14 },
    px: 2,
    py: 0.5,
    mb: 2,
    "& .MuiChip-icon": {
      color: "white",
    },
  },

  heroTitle: {
    fontWeight: 800,
    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 2,
    letterSpacing: "-0.5px",
    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
  },

  heroSubtitle: {
    color: "#64748b",
    maxWidth: 600,
    mx: "auto",
    fontSize: { xs: 14, sm: 16, md: 18 },
    lineHeight: 1.6,
    px: { xs: 2, sm: 0 },
  },

  heroDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    overflow: "hidden",
    display: { xs: "none", md: "block" },
  },

  decorationCircle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
  },

  decorationCircle2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 70%)",
  },

  planCard: (colors, isPopular) => ({
    position: "relative",
    height: "100%",
    borderRadius: { xs: 3, sm: 4 },
    border: isPopular ? "3px solid" : "2px solid",
    borderColor: isPopular ? colors.primary : "#e2e8f0",
    boxShadow: isPopular
      ? `0 8px 24px ${colors.primary}40`
      : "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    mx: "auto",
    maxWidth: { xs: "100%", sm: 400, lg: "100%" },
    "&:hover": {
      transform: { xs: "translateY(-4px)", sm: "translateY(-8px)" },
      boxShadow: `0 12px 32px ${colors.primary}40`,
      borderColor: colors.primary,
    },
  }),

  popularBadge: {
    position: "absolute",
    top: { xs: 12, sm: 16 },
    right: { xs: 12, sm: 16 },
    zIndex: 3,
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "white",
    fontWeight: 700,
    fontSize: { xs: 11, sm: 12 },
  },

  planHeader: (colors) => ({
    position: "relative",
    p: { xs: 2.5, sm: 3 },
    pb: { xs: 3, sm: 4 },
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: "white",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 20,
      background: "white",
      borderRadius: "20px 20px 0 0",
    },
  }),

  planIconWrapper: {
    width: { xs: 56, sm: 64 },
    height: { xs: 56, sm: 64 },
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 2,
    animation: "float 3s ease-in-out infinite",
    "@keyframes float": {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },

  planName: {
    fontWeight: 700,
    textAlign: "center",
    color: "white",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  },

  roiContainer: {
    textAlign: "center",
    py: { xs: 2, sm: 3 },
    mb: { xs: 2, sm: 3 },
    borderRadius: 3,
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  },

  roiNumber: (colors) => ({
    fontWeight: 800,
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px",
    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
  }),

  roiLabel: {
    color: "#64748b",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: { xs: 10, sm: 11 },
    mt: 0.5,
  },

  detailsContainer: {
    mb: { xs: 2, sm: 3 },
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1.5, sm: 2 },
  },

  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: { xs: 1, sm: 1.5 },
    p: { xs: 1.5, sm: 2 },
    borderRadius: 2,
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
  },

  detailIcon: {
    fontSize: { xs: 20, sm: 24 },
    color: "#667eea",
    mt: 0.5,
  },

  detailLabel: {
    color: "#64748b",
    fontWeight: 600,
    fontSize: { xs: 10, sm: 11 },
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
    mb: 0.5,
  },

  detailValue: {
    color: "#1e293b",
    fontWeight: 700,
    fontSize: { xs: 13, sm: 15 },
    wordBreak: "break-word",
  },

  investButton: (colors) => ({
    py: { xs: 1.5, sm: 1.8 },
    borderRadius: 2.5,
    fontWeight: 700,
    fontSize: { xs: 14, sm: 16 },
    textTransform: "none",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    boxShadow: `0 4px 12px ${colors.primary}40`,
    transition: "all 0.3s ease",
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      boxShadow: `0 6px 20px ${colors.primary}60`,
      transform: "translateY(-2px)",
    },
  }),
};

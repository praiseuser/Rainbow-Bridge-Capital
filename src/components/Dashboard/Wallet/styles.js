export const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    py: { xs: 4, sm: 6 },
    position: "relative",
  },

  bgDecoration: {
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
    width: 300,
    height: 300,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)",
    animation: "float 20s ease-in-out infinite",
    "@keyframes float": {
      "0%, 100%": { transform: "translate(0, 0)" },
      "50%": { transform: "translate(-30px, 30px)" },
    },
  },

  circle2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
    animation: "float 25s ease-in-out infinite reverse",
  },

  header: {
    textAlign: "center",
    mb: { xs: 4, sm: 5 },
    position: "relative",
    zIndex: 2,
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

  balanceCard: {
    position: "relative",
    borderRadius: 4,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
    border: "none",
    overflow: "hidden",
    zIndex: 2,
  },

  balanceCardPattern: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    transform: "translate(40%, -40%)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  iconWrapper: {
    width: { xs: 64, sm: 72 },
    height: { xs: 64, sm: 72 },
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "pulse 2s ease-in-out infinite",
    "@keyframes pulse": {
      "0%, 100%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.05)" },
    },
  },

  visibilityButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
    width: { xs: 44, sm: 48 },
    height: { xs: 44, sm: 48 },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  },

  balanceLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: 700,
    fontSize: { xs: 13, sm: 14 },
    textTransform: "uppercase",
    letterSpacing: "1px",
    mb: 1,
  },

  balanceAmount: {
    fontWeight: 900,
    color: "white",
    letterSpacing: "-1px",
    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
    mb: 2,
    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  statusChip: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    backdropFilter: "blur(10px)",
    color: "#10b981",
    fontWeight: 700,
    border: "2px solid rgba(16, 185, 129, 0.3)",
    "& .MuiChip-icon": {
      color: "#10b981",
    },
  },

  actionCard: {
    borderRadius: 3,
    border: "2px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      borderColor: "#667eea",
    },
  },

  actionCardContent: {
    p: 3,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  actionIconWrapper: (color) => ({
    width: 56,
    height: 56,
    borderRadius: "14px",
    background: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 4px 12px ${color}40`,
    flexShrink: 0,
  }),

  actionTitle: {
    fontWeight: 700,
    color: "#1e293b",
    fontSize: { xs: 16, sm: 18 },
    mb: 0.5,
  },

  actionDescription: {
    color: "#64748b",
    fontSize: { xs: 13, sm: 14 },
  },

  activitySection: {
    mt: 5,
    position: "relative",
    zIndex: 2,
  },

  sectionTitle: {
    fontWeight: 700,
    color: "#1e293b",
    mb: 3,
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  },

  emptyState: {
    textAlign: "center",
    py: 6,
    px: 3,
    borderRadius: 3,
    border: "2px dashed #e2e8f0",
    backgroundColor: "#f8fafc",
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

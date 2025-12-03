export const keyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
}
@keyframes rotateText {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

export const styles = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "600px",
    padding: "80px 40px",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "60px",
    flexWrap: "wrap",
  },

  leftSection: {
    flex: 1,
    minWidth: "280px",
    maxWidth: "600px",
  },

  title: {
    fontSize: "clamp(28px, 5vw, 64px)",
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: "24px",
    color: "#0f172a",
  },

  gradient: {
    background:
      "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: "clamp(14px, 2vw, 18px)",
    lineHeight: 1.7,
    color: "#475569",
    marginBottom: "32px",
    maxWidth: "500px",
  },

  ctaWrap: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.3)",
  },

  secondaryBtn: {
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#6366f1",
    background: "transparent",
    border: "2px solid #6366f1",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  rightSection: {
    flex: 1,
    minWidth: "280px",
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  circleWrapper: {
    position: "relative",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "rotateText 20s linear infinite",
  },

  circleText: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: "14px",
    fontWeight: 700,
    color: "#1e293b", // Dark color for better visibility
    textTransform: "uppercase",
    textAlign: "center",
  },

  "@media (max-width: 768px)": {
    container: { padding: "60px 20px" },
    rightSection: { height: "300px" },
    title: { fontSize: "clamp(24px, 6vw, 48px)" },
    subtitle: { fontSize: "clamp(12px, 3vw, 16px)" },
    circleWrapper: { width: "220px", height: "220px" },
    circleText: { fontSize: "12px" },
  },

  "@media (max-width: 480px)": {
    content: { flexDirection: "column-reverse", gap: "40px" },
    rightSection: { height: "250px" },
    circleWrapper: { width: "180px", height: "180px" },
    circleText: { fontSize: "10px" },
  },
};

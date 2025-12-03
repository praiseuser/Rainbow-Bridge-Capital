export const keyframes = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(200%) rotate(45deg); }
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(30px, -30px); }
    66% { transform: translate(-20px, 20px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const styles = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "700px",
    padding: "100px 40px",
    background:
      "linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)",
    overflow: "hidden",
  },

  meshBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)
    `,
    animation: "pulse 8s ease-in-out infinite",
  },

  floatingOrb1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)",
    top: "10%",
    right: "5%",
    animation: "float 15s ease-in-out infinite",
    filter: "blur(40px)",
  },

  floatingOrb2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent 70%)",
    bottom: "15%",
    left: "10%",
    animation: "float 12s ease-in-out infinite 2s",
    filter: "blur(40px)",
  },

  floatingOrb3: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 70%)",
    top: "50%",
    left: "50%",
    animation: "float 10s ease-in-out infinite 1s",
    filter: "blur(40px)",
  },

  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    textAlign: "center",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    borderRadius: "50px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(139, 92, 246, 0.2)",
    marginBottom: "28px",
    animation: "fadeSlideDown 0.6s ease-out",
    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
  },

  badgeText: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#8b5cf6",
    letterSpacing: "0.5px",
  },

  title: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: "50px",
    color: "#1e1b4b",
    animation: "fadeSlideUp 0.8s ease-out 0.2s backwards",
  },

  gradientText: {
    background:
      "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #6366f1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  featureGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "50px",
    flexWrap: "wrap",
  },

  featureCard: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "18px 28px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(20px)",
    border: "2px solid rgba(255, 255, 255, 0.6)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: "scaleIn 0.6s ease-out backwards",
    cursor: "pointer",
    overflow: "hidden",
  },

  featureIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  featureText: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1e1b4b",
    letterSpacing: "0.3px",
  },

  featureShimmer: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "50%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
    animation: "shimmer 3s infinite",
    pointerEvents: "none",
  },

  description: {
    fontSize: "clamp(17px, 2vw, 19px)",
    lineHeight: 1.8,
    color: "#4c1d95",
    maxWidth: "800px",
    margin: "0 auto 50px",
    animation: "fadeSlideUp 0.8s ease-out 0.4s backwards",
  },

  highlight: {
    fontWeight: 700,
    color: "#8b5cf6",
  },

  highlightRow: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    marginBottom: "50px",
    flexWrap: "wrap",
    animation: "fadeSlideUp 0.8s ease-out 0.6s backwards",
  },

  highlightCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 24px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(139, 92, 246, 0.15)",
    boxShadow: "0 4px 16px rgba(139, 92, 246, 0.12)",
    transition: "transform 0.3s ease",
    cursor: "default",
  },

  highlightContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  highlightLabel: {
    fontSize: "12px",
    color: "#6b7280",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  highlightValue: {
    fontSize: "16px",
    color: "#1e1b4b",
    fontWeight: 800,
  },

  ctaBanner: {
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "32px 40px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
    border: "2px solid rgba(139, 92, 246, 0.3)",
    animation: "fadeSlideUp 0.8s ease-out 0.8s backwards",
    overflow: "hidden",
  },

  ctaGlow: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 50%)",
    animation: "rotate 20s linear infinite",
    pointerEvents: "none",
  },

  ctaContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: "20px",
    justifyContent: "center",
  },

  ctaIcon: {
    fontSize: "32px",
    flexShrink: 0,
    animation: "pulse 2s ease-in-out infinite",
  },

  ctaText: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#4c1d95",
    margin: 0,
    textAlign: "left",
  },
};

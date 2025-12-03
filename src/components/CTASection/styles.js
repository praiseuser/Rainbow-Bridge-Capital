// ANIMATION KEYFRAMES
export const ctaKeyframes = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.2); }
    50% { box-shadow: 0 0 35px rgba(236, 72, 153, 0.5); }
  }

  @keyframes gradientBorder {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes particleMove {
    0% { opacity: 0; transform: translate(0,0) scale(1); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translate(120px, -120px) scale(0); }
  }
`;

export const getCTAStyles = (theme, isMobile) => ({
  container: {
    position: "relative",
    width: "100%",
    maxWidth: "1100px",
    margin: "150px auto",
    padding: "20px",
  },

  // FLOATING PARTICLES
  particle1: {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ec4899",
    top: "20%",
    left: "10%",
    animation: "particleMove 6s infinite ease-in-out",
  },
  particle2: {
    position: "absolute",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#8b5cf6",
    bottom: "25%",
    right: "12%",
    animation: "particleMove 7s infinite 1.2s ease-in-out",
  },
  particle3: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#06b6d4",
    top: "60%",
    left: "50%",
    animation: "particleMove 8s infinite 0.8s ease-in-out",
  },

  // MAIN GLASS CONTAINER
  glassWrap: {
    padding: isMobile ? "50px 20px" : "70px 40px",
    textAlign: "center",
    borderRadius: "24px",
    backdropFilter: "blur(14px)",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    animation: "fadeUp 0.8s ease-out",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",

    // animated gradient border
    position: "relative",
    overflow: "hidden",
  },

  // animated glowing border overlay
  glowBorder: {
    content: '""',
    position: "absolute",
    inset: 0,
    padding: "2px",
    borderRadius: "24px",
    background:
      "linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #ec4899)",
    backgroundSize: "300% 300%",
    animation: "gradientBorder 6s linear infinite",
    zIndex: -1,
  },

  title: {
    ...theme.typography.h3,
    fontWeight: 900,
    color: "#fff",
    marginBottom: "15px",
    animation: "fadeUp 1s ease-out",
  },

  subtitle: {
    ...theme.typography.body1,
    color: "rgba(255,255,255,0.85)",
    maxWidth: "680px",
    margin: "0 auto 35px",
    animation: "fadeUp 1.2s ease-out",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    animation: "fadeUp 1.4s ease-out",
  },

  primaryBtn: {
    padding: "14px 34px",
    fontWeight: 800,
    borderRadius: "14px",
    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    color: "#fff",
    transition: "0.35s",
    boxShadow: "0 0 25px rgba(236, 72, 153, 0.35)",
    animation: "pulseGlow 2.5s infinite",

    "&:hover": {
      transform: "scale(1.07)",
      boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
    },
  },

  secondaryBtn: {
    padding: "14px 34px",
    fontWeight: 800,
    borderRadius: "14px",
    border: "2px solid rgba(255,255,255,0.7)",
    color: "#fff",
    transition: "0.35s",

    "&:hover": {
      transform: "scale(1.07)",
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(20px)",
    },
  },
});

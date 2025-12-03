export const keyframes = `
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes shimmer {
    0% { opacity: 0.3; transform: translateX(-50px); }
    100% { opacity: 1; transform: translateX(50px); }
  }

  @keyframes particle {
    0% { opacity: 0; transform: translateY(0) scale(0.8); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-60px) scale(1.3); }
  }

  @keyframes auroraMove {
    0% { transform: translateX(-200px); opacity: 0.35; }
    50% { opacity: 0.75; }
    100% { transform: translateX(200px); opacity: 0.35; }
  }
`;

/* helper to build particle objects */
function particle(color, top, left, delay) {
  return {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: color,
    top,
    left,
    opacity: 0,
    animation: `particle 6s infinite ${delay}s ease-in-out`,
  };
}

/* helper to build aurora objects */
function aurora(color, left, size, duration) {
  return {
    position: "absolute",
    bottom: "0px",
    left,
    width: size,
    height: "180px",
    background: color,
    filter: "blur(70px)",
    animation: `auroraMove ${duration} infinite linear`,
  };
}

export const styles = {
  root: {
    width: "100%",
    position: "relative",
    padding: "130px 0 70px",
    overflow: "hidden",
    background: `
      linear-gradient(160deg, #0f0120 0%, #1a0033 40%, #26003f 100%)
    `,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  /* GOLD PARTICLES */
  p1: particle("#facc15", "12%", "8%", 0),
  p2: particle("#fbbf24", "28%", "22%", 0.8),
  p3: particle("#fde047", "48%", "78%", 0.4),
  p4: particle("#fcd34d", "68%", "62%", 1.2),

  /* AURORA LIGHTS */
  aurora1: aurora("rgba(255,200,255,0.28)", "-120px", "320px", "18s"),
  aurora2: aurora("rgba(180,160,255,0.26)", "220px", "420px", "22s"),

  /* GLASS CENTER BOX */
  glassBox: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "50px 25px",
    textAlign: "center",

    borderRadius: "24px",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.06)",

    animation: "shimmer 2s ease-out",
  },

  logo: {
    fontSize: "2.2rem",
    fontWeight: 900,
    background: "linear-gradient(90deg, #facc15, #e879f9, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "18px",
  },

  subtitle: {
    fontSize: "1.15rem",
    color: "rgba(255,255,255,0.88)",
    maxWidth: "620px",
    margin: "0 auto",
    lineHeight: 1.7,
  },

  /* ICONS */
  iconRow: {
    marginTop: "35px",
    display: "flex",
    justifyContent: "center",
    gap: "25px",
  },

  iconBtn: {
    color: "#fff",
    fontSize: "28px",
    animation: "float 5s infinite ease-in-out",
    transition: "0.35s",

    "&:hover": {
      transform: "scale(1.35)",
      color: "#facc15",
      textShadow: "0 0 18px #facc15",
    },
  },

  bottomText: {
    marginTop: "25px",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.9rem",
  },
};

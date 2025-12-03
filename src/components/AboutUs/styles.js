export const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
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
    minHeight: "100vh",
    padding: "100px 20px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    color: "#fff",
  },

  content: {
    maxWidth: "1200px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "60px",
    flexWrap: "wrap",
    zIndex: 2,
    position: "relative",
  },

  leftSection: {
    flex: 1,
    minWidth: "300px",
    maxWidth: "600px",
    animation: "fadeInUp 1s ease-out forwards",
  },

  title: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: "24px",
    background: "linear-gradient(135deg, #6366f1, #ec4899, #facc15)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: "#cbd5e1",
    marginBottom: "40px",
  },

  rightSection: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  benefitCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "25px 30px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
    animation: "fadeInUp 0.8s ease-out forwards",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
    },
  },

  benefitTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#fff",
  },

  benefitText: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
    lineHeight: 1.6,
  },

  /* Floating decorative circles */
  floatingCircle1: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.3)",
    top: "10%",
    left: "5%",
    filter: "blur(100px)",
    animation: "float 6s ease-in-out infinite",
  },
  floatingCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(236,72,153,0.25)",
    bottom: "10%",
    right: "10%",
    filter: "blur(120px)",
    animation: "float 8s ease-in-out infinite",
  },
  floatingCircle3: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "rgba(250,204,21,0.25)",
    top: "50%",
    right: "25%",
    filter: "blur(90px)",
    animation: "float 5s ease-in-out infinite",
  },

  "@media (max-width: 768px)": {
    content: { flexDirection: "column", gap: "40px" },
    leftSection: { textAlign: "center" },
  },
};

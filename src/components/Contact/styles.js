export const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
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

  rightSection: {
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
    marginBottom: "30px",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    color: "#ec4899",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.3s",
    "&:hover": {
      color: "#facc15",
      transform: "translateX(5px)",
    },
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    background: "rgba(255,255,255,0.05)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
  },

  input: {
    padding: "15px 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s",
  },

  textarea: {
    padding: "15px 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
    transition: "all 0.3s",
  },

  submitBtn: {
    padding: "15px 25px",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 24px rgba(236,72,153,0.5)",
    },
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
    rightSection: { textAlign: "center" },
  },
};
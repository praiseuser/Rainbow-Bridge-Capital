export const keyframes = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

export const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    overflow: "hidden",
  },

  bgOrb1: {
    position: "absolute",
    width: "clamp(300px, 40vw, 500px)",
    height: "clamp(300px, 40vw, 500px)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 70%)",
    top: "-150px",
    right: "-100px",
    animation: "float 8s ease-in-out infinite",
    filter: "blur(60px)",
  },

  bgOrb2: {
    position: "absolute",
    width: "clamp(250px, 35vw, 400px)",
    height: "clamp(250px, 35vw, 400px)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 70%)",
    bottom: "-100px",
    left: "-80px",
    animation: "float 10s ease-in-out infinite 2s",
    filter: "blur(60px)",
  },

  bgOrb3: {
    position: "absolute",
    width: "clamp(200px, 30vw, 350px)",
    height: "clamp(200px, 30vw, 350px)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 70%)",
    top: "50%",
    left: "50%",
    animation: "float 12s ease-in-out infinite 1s",
    filter: "blur(60px)",
  },

  formWrapper: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "450px",
    animation: "fadeSlideUp 0.6s ease-out",
  },

  formCard: {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "clamp(24px, 5vw, 40px)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: "24px",
  },

  header: {
    textAlign: "center",
    marginBottom: "32px",
  },

  logoWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    animation: "pulse 2s ease-in-out infinite",
  },

  logo: {
    fontSize: "clamp(40px, 8vw, 56px)",
  },

  title: {
    fontSize: "clamp(24px, 4vw, 32px)",
    fontWeight: 900,
    color: "#1f2937",
    marginBottom: "8px",
    margin: 0,
  },

  subtitle: {
    fontSize: "clamp(14px, 2vw, 16px)",
    color: "#6b7280",
    margin: 0,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "clamp(13px, 2vw, 14px)",
    fontWeight: 600,
    color: "#374151",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  icon: {
    position: "absolute",
    left: "16px",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    fontSize: "clamp(14px, 2vw, 16px)",
    color: "#1f2937",
    background: "#f9fafb",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },

  eyeBtn: {
    position: "absolute",
    right: "16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    width: "100%",
    padding: "clamp(14px, 2vw, 16px)",
    fontSize: "clamp(15px, 2vw, 16px)",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
    marginTop: "8px",
  },

  submitBtnLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  submitBtnText: {
    flex: 1,
    textAlign: "center",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    animation: "fadeIn 0.8s ease-out 0.3s backwards",
  },

  featureCard: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "clamp(12px, 2vw, 16px)",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  featureIcon: {
    fontSize: "clamp(24px, 4vw, 32px)",
    marginBottom: "8px",
  },

  featureText: {
    fontSize: "clamp(11px, 1.5vw, 13px)",
    color: "#374151",
    fontWeight: 600,
  },
};

export const keyframes = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(15px, -15px) scale(1.05); }
  }
  @keyframes fillProgress {
    from { width: 0%; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
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
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    overflow: "hidden",
  },

  bgOrb1: {
    position: "absolute",
    width: "clamp(300px, 40vw, 500px)",
    height: "clamp(300px, 40vw, 500px)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%)",
    top: "-100px",
    right: "-80px",
    animation: "float 10s ease-in-out infinite",
    filter: "blur(60px)",
  },

  bgOrb2: {
    position: "absolute",
    width: "clamp(250px, 35vw, 400px)",
    height: "clamp(250px, 35vw, 400px)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.25), transparent 70%)",
    bottom: "-80px",
    left: "-60px",
    animation: "float 12s ease-in-out infinite 2s",
    filter: "blur(60px)",
  },

  wrapper: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "600px",
    animation: "fadeSlideUp 0.6s ease-out",
  },

  progressContainer: {
    marginBottom: "24px",
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "100px",
    overflow: "hidden",
    marginBottom: "12px",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "100px",
    transition: "width 0.4s ease",
    animation: "fillProgress 0.6s ease-out",
  },

  progressText: {
    textAlign: "center",
    fontSize: "clamp(14px, 2vw, 16px)",
    fontWeight: 700,
    color: "#ffffff",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },

  card: {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "clamp(24px, 5vw, 48px)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  stepContent: {
    textAlign: "center",
    marginBottom: "32px",
  },

  emoji: {
    fontSize: "clamp(48px, 8vw, 64px)",
    marginBottom: "20px",
    animation: "pulse 2s ease-in-out infinite",
  },

  title: {
    fontSize: "clamp(24px, 4vw, 32px)",
    fontWeight: 900,
    color: "#1f2937",
    marginBottom: "12px",
    margin: "0 0 12px 0",
  },

  subtitle: {
    fontSize: "clamp(14px, 2vw, 16px)",
    color: "#6b7280",
    marginBottom: "24px",
    margin: "0 0 24px 0",
  },

  question: {
    fontSize: "clamp(16px, 2vw, 18px)",
    color: "#374151",
    marginBottom: "24px",
    fontWeight: 600,
    margin: "0 0 24px 0",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  choiceBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "clamp(14px, 2vw, 18px)",
    fontSize: "clamp(15px, 2vw, 16px)",
    fontWeight: 600,
    color: "#374151",
    background: "#f9fafb",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  choiceBtnActive: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#ffffff",
    borderColor: "transparent",
    transform: "scale(1.02)",
  },

  input: {
    width: "100%",
    padding: "clamp(14px, 2vw, 16px)",
    fontSize: "clamp(15px, 2vw, 16px)",
    color: "#1f2937",
    background: "#f9fafb",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },

  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    background: "#f9fafb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
  },

  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: "#667eea",
  },

  checkboxText: {
    fontSize: "clamp(14px, 2vw, 16px)",
    fontWeight: 600,
    color: "#374151",
  },

  toggleContainer: {
    display: "flex",
    justifyContent: "center",
  },

  toggleLabel: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    cursor: "pointer",
  },

  toggleInput: {
    display: "none",
  },

  toggleSlider: {
    position: "relative",
    width: "56px",
    height: "32px",
    background: "#d1d5db",
    borderRadius: "100px",
    transition: "all 0.3s ease",
  },

  toggleSliderActive: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  toggleThumb: {
    position: "absolute",
    top: "4px",
    left: "4px",
    width: "24px",
    height: "24px",
    background: "#ffffff",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    transform: "translateX(0)",
  },

  toggleText: {
    fontSize: "clamp(15px, 2vw, 16px)",
    fontWeight: 600,
    color: "#374151",
  },

  navButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "space-between",
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "clamp(12px, 2vw, 14px) clamp(20px, 3vw, 24px)",
    fontSize: "clamp(14px, 2vw, 15px)",
    fontWeight: 600,
    color: "#6b7280",
    background: "#f9fafb",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  nextBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)",
    fontSize: "clamp(14px, 2vw, 15px)",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "auto",
  },

  finishBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)",
    fontSize: "clamp(14px, 2vw, 15px)",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #10b981, #059669)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "auto",
  },
};

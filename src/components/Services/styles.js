export const keyframes = `
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export const styles = {
  container: {
    width: "100%",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    color: "#ffffff",
  },
  hero: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "clamp(32px, 5vw, 64px)",
    fontWeight: 900,
    background: "linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "clamp(16px, 2vw, 20px)",
    color: "#cbd5e1",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.7,
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "30px 25px",
    width: "280px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
    animation: "fadeInUp 0.8s forwards",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#facc15",
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: "#e2e8f0",
    lineHeight: 1.6,
  },
  "@media (max-width: 768px)": {
    cardsContainer: { gap: "20px" },
    card: { width: "100%" },
  },
};
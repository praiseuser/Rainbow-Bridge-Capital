export const styles = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "650px",
    padding: "120px 20px",
    background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  // BLOBS
  blob1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.35)",
    filter: "blur(80px)",
    top: "-80px",
    left: "-80px",
    animation: "blobMove 9s ease-in-out infinite",
  },

  blob2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(236,72,153,0.35)",
    filter: "blur(90px)",
    bottom: "-100px",
    right: "-100px",
    animation: "blobMove 11s ease-in-out infinite",
  },

  // CENTERED CONTENT
  centerContent: {
    zIndex: 2,
    maxWidth: "900px",
    margin: "0 auto",
  },

  bigTitle: {
    fontSize: "clamp(42px, 6vw, 80px)",
    fontWeight: 900,
    lineHeight: 1.1,
    color: "#0f172a",
    marginBottom: "20px",
  },

  gradient: {
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitleCenter: {
    fontSize: "clamp(15px, 2vw, 22px)",
    color: "#475569",
    lineHeight: 1.7,
    maxWidth: "700px",
    margin: "0 auto 35px auto",
  },

  // CTA BOX CENTERED
  ctaWrapCenter: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "16px 36px",
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
  },

  secondaryBtn: {
    padding: "16px 36px",
    fontSize: "18px",
    fontWeight: 600,
    color: "#6366f1",
    background: "#ffffff",
    border: "2px solid #6366f1",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "0.3s ease",
  },

  "@keyframes blobMove": {
    "0%,100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.2)" },
  },
};

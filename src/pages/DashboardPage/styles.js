// src/styles/dashboardStyles.js
export const dashboardStyles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0a1f44", // dark navy blue
    color: "#ffffff",
    display: "flex",
    fontFamily: "'Roboto', sans-serif",
  },

  mainContent: {
    flex: 1,
    padding: { xs: "80px 15px 15px 15px", md: "100px 30px 30px 30px" },
    overflowX: "hidden",
  },

  section: {
    backgroundColor: "#112954", // slightly lighter navy
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },

  sectionTitle: {
    fontSize: { xs: "1.2rem", md: "1.5rem" },
    fontWeight: 700,
    marginBottom: "12px",
  },

  card: {
    backgroundColor: "#1a2b55",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.2)",
  },

  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "8px",
  },

  cardText: {
    fontSize: "0.9rem",
    color: "#d0d7ff",
  },

  // Responsive tweaks
  "@media (max-width: 1024px)": {
    mainContent: { padding: "90px 20px 20px 20px" },
  },
  "@media (max-width: 768px)": {
    mainContent: { padding: "80px 15px 15px 15px" },
    sectionTitle: { fontSize: "1.3rem" },
    card: { padding: "12px" },
  },
};

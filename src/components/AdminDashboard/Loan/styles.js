const styles = {
  container: {
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },

  title: {
    fontSize: "1.8rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #667eea, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },

  subtitle: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginTop: "6px",
    margin: 0,
  },

  filterPaper: {
    padding: "16px",
    marginBottom: "24px",
    borderRadius: "16px",
    background: "#1e293b",
    border: "1px solid #334155",
  },

  filterRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  searchWrapper: {
    position: "relative",
    flex: "1 1 250px",
    minWidth: "250px",
  },

  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    fontSize: "1.2rem",
  },

  searchInput: {
    width: "100%",
    padding: "10px 10px 10px 40px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
    fontSize: "0.9rem",
  },

  filterSelect: {
    flex: "0 1 150px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
    fontSize: "0.9rem",
    cursor: "pointer",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "20px",
  },

  loanCard: {
    padding: "24px",
    borderRadius: "20px",
    background: "#1e293b",
    border: "1px solid #334155",
    transition: "all 0.3s",
    animation: "fadeSlideUp 0.4s ease-out backwards",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  cardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  loanIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#667eea20",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
  },

  userEmail: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    marginTop: "4px",
    margin: 0,
  },

  statusChip: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "0.75rem",
    fontWeight: 700,
  },

  detailsSection: {
    marginBottom: "20px",
  },

  amountBox: {
    padding: "16px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea15, #ec489915)",
    border: "1px solid #667eea30",
    marginBottom: "16px",
    textAlign: "center",
  },

  amountLabel: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
    marginBottom: "6px",
  },

  amountValue: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#667eea",
    margin: 0,
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  detailItem: {
    padding: "12px",
    borderRadius: "10px",
    background: "#0f172a",
  },

  detailLabel: {
    fontSize: "0.7rem",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
    marginBottom: "6px",
  },

  detailValue: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#fff",
    margin: 0,
  },

  actionBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea, #ec4899)",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};

export default styles;

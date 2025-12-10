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

  exportBtn: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea, #ec4899)",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s",
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

  dateInput: {
    flex: "0 1 150px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
    fontSize: "0.9rem",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  transactionCard: {
    padding: "20px",
    borderRadius: "16px",
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

  typeIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    fontSize: "0.95rem",
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
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "0.7rem",
    fontWeight: 700,
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },

  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  detailLabel: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },

  detailValue: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#fff",
    margin: 0,
  },

  typeChip: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.7rem",
    fontWeight: 700,
    width: "fit-content",
  },

  amount: {
    fontSize: "1.1rem",
    fontWeight: 800,
    color: "#667eea",
    margin: 0,
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },

  pageBtn: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155",
    transition: "all 0.3s",
  },

  pageInfo: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#fff",
  },
};

export default styles;
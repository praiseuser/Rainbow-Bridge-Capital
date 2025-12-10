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

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  investmentCard: {
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
    marginBottom: "16px",
  },

  cardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  planIcon: {
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
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "0.7rem",
    fontWeight: 700,
  },

  planBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea20, #ec489920)",
    border: "1px solid #667eea40",
    color: "#667eea",
    fontSize: "0.85rem",
    fontWeight: 700,
    marginBottom: "16px",
  },

  amountSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "12px",
    background: "#0f172a",
    marginBottom: "16px",
  },

  amountItem: {
    flex: 1,
    textAlign: "center",
  },

  divider: {
    width: "1px",
    height: "40px",
    background: "#334155",
    margin: "0 16px",
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
    fontSize: "1.1rem",
    fontWeight: 800,
    color: "#fff",
    margin: 0,
  },

  returnValue: {
    fontSize: "1.1rem",
    fontWeight: 800,
    color: "#16a34a",
    margin: 0,
  },

  progressSection: {
    marginBottom: "16px",
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  progressLabel: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    fontWeight: 600,
  },

  progressPercent: {
    fontSize: "0.8rem",
    color: "#667eea",
    fontWeight: 700,
  },

  progressBar: {
    width: "100%",
    height: "8px",
    borderRadius: "10px",
    background: "#0f172a",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #667eea, #ec4899)",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },

  datesSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },

  dateItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  dateIcon: {
    fontSize: "1rem",
    color: "#667eea",
  },

  dateLabel: {
    fontSize: "0.7rem",
    color: "#9ca3af",
    margin: 0,
  },

  dateValue: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#fff",
    margin: 0,
    marginTop: "2px",
  },

  updateBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #f59e0b, #fb923c)",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s",
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

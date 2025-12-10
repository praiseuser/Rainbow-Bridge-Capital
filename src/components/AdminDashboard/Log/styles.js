// src/components/Admin/SystemLogs/styles.js
const styles = {
  wrapper: {
    padding: "20px",
    backgroundColor: "#0a1f44",
    minHeight: "100%",
    color: "#fff",
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "20px",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "10px",
    backgroundColor: "#1e293b",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  thead: {
    backgroundColor: "#111827",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    fontSize: "14px",
    color: "#fff",
    borderBottom: "1px solid #374151",
  },
  td: {
    padding: "12px 15px",
    fontSize: "14px",
    color: "#fff",
    borderBottom: "1px solid #374151",
    whiteSpace: "nowrap",
  },
  row: {
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#374151",
    },
  },
};

export default styles;

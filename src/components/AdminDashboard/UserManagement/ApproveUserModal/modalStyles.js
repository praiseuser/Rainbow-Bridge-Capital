const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    backdropFilter: "blur(3px)",
  },

  modal: {
    width: "90%",
    maxWidth: "420px",
    background: "#0f172a",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #1e293b",
    animation: "fadeIn 0.25s ease",
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "white",
  },

  text: {
    fontSize: "15px",
    color: "#cbd5e1",
    marginBottom: "24px",
  },

  btnRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },

  cancelBtn: {
    background: "#475569",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  approveBtn: {
    background: "#22c55e",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default styles;

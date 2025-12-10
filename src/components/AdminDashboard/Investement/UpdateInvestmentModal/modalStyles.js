const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    background: "#0f274f",
    padding: "25px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    animation: "slideDown 0.3s ease",
  },

  title: {
    fontSize: "20px",
    marginBottom: "15px",
  },

  label: {
    fontSize: "14px",
    margin: "8px 0 4px",
  },

  input: {
    width: "100%",
    padding: "10px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#fff",
    marginBottom: "10px",
  },

  select: {
    width: "100%",
    padding: "10px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#fff",
    marginBottom: "10px",
  },

  btnRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "15px",
  },

  cancelBtn: {
    padding: "8px 14px",
    background: "#ef4444",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },

  updateBtn: {
    padding: "8px 14px",
    background: "#22c55e",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default styles;

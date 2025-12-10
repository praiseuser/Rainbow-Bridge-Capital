// src/components/Admin/Notifications/styles.js
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
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  notificationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
    minWidth: "300px",
  },
  notificationContent: {
    display: "flex",
    flexDirection: "column",
  },
  notificationTitle: {
    fontSize: "14px",
    fontWeight: 600,
    margin: 0,
  },
  notificationTime: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "2px",
  },
  unreadDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#facc15",
  },
};

export default styles;

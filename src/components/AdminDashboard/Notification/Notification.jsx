// src/components/Admin/Notifications/Notifications.jsx
import { useState } from "react";
import styles from "./styles";

const initialNotifications = [
    { id: 1, title: "New user registered", time: "2 mins ago", read: false },
    { id: 2, title: "Investment approved", time: "1 hour ago", read: true },
    { id: 3, title: "Loan request pending", time: "3 hours ago", read: false },
    { id: 4, title: "KYC verification updated", time: "Yesterday", read: true },
];

const Notifications = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>Notifications</h2>

            <div style={styles.listWrapper}>
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            ...styles.notificationItem,
                            backgroundColor: notification.read ? "#1e293b" : "#374151",
                        }}
                        onClick={() => markAsRead(notification.id)}
                    >
                        <div style={styles.notificationContent}>
                            <p style={styles.notificationTitle}>{notification.title}</p>
                            <span style={styles.notificationTime}>{notification.time}</span>
                        </div>
                        {!notification.read && <span style={styles.unreadDot}></span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;

// src/components/Admin/KYCVerification/KYCVerification.jsx
import { useState } from "react";
import styles from "./styles";

const users = [
    { id: 1, name: "John Doe", email: "john@gmail.com", kycStatus: "Pending" },
    { id: 2, name: "Mary Okafor", email: "mary@gmail.com", kycStatus: "Approved" },
    { id: 3, name: "James Obi", email: "james@gmail.com", kycStatus: "Rejected" },
];

const KYC = () => {
    const [userList, setUserList] = useState(users);

    const handleUpdateKYC = (id, status) => {
        setUserList(
            userList.map((user) =>
                user.id === id ? { ...user, kycStatus: status } : user
            )
        );
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>User KYC Verification</h2>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>KYC Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.id} style={styles.row}>
                                <td style={styles.td}>{user.id}</td>
                                <td style={styles.td}>{user.name}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    <span
                                        style={{
                                            ...styles.statusTag,
                                            background:
                                                user.kycStatus === "Approved"
                                                    ? "#16a34a"
                                                    : user.kycStatus === "Rejected"
                                                        ? "#ef4444"
                                                        : "#f59e0b",
                                        }}
                                    >
                                        {user.kycStatus}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    {user.kycStatus !== "Approved" && (
                                        <button
                                            style={styles.approveBtn}
                                            onClick={() => handleUpdateKYC(user.id, "Approved")}
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {user.kycStatus !== "Rejected" && (
                                        <button
                                            style={styles.rejectBtn}
                                            onClick={() => handleUpdateKYC(user.id, "Rejected")}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KYC;

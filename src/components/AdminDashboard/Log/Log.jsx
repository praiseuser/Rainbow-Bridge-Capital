// src/components/Admin/SystemLogs/SystemLogs.jsx
import styles from "./styles";

const logs = [
    { id: 1, action: "Approved user John Doe", date: "2025-12-10 09:12" },
    { id: 2, action: "Updated investment ROI for Mary Okafor", date: "2025-12-10 09:45" },
    { id: 3, action: "Rejected loan request for James Obi", date: "2025-12-10 10:03" },
    { id: 4, action: "Updated site settings", date: "2025-12-10 10:15" },
];

const Log = () => {
    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>System Logs</h2>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Action</th>
                            <th style={styles.th}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} style={styles.row}>
                                <td style={styles.td}>{log.id}</td>
                                <td style={styles.td}>{log.action}</td>
                                <td style={styles.td}>{log.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Log;

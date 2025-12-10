import React from "react";
import styles from "./modalStyles";

const UpdateInvestmentModal = ({ open, onClose, investment }) => {
    if (!open || !investment) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3 style={styles.title}>Update Investment</h3>

                <p style={styles.label}>User: {investment.user}</p>
                <p style={styles.label}>Plan: {investment.plan}</p>

                <label style={styles.label}>Update Status:</label>
                <select style={styles.select}>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Pending</option>
                </select>

                <label style={styles.label}>Returns Amount:</label>
                <input
                    type="number"
                    defaultValue={investment.returns}
                    style={styles.input}
                />

                <div style={styles.btnRow}>
                    <button style={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>

                    <button style={styles.updateBtn}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateInvestmentModal;

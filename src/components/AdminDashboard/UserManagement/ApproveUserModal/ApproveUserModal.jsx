import React from "react";
import styles from "./modalStyles";

const ApproveUserModal = ({ open, onClose, user }) => {
    if (!open) return null; 

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>Approve User</h2>

                <p style={styles.text}>
                    Are you sure you want to approve{" "}
                    <span style={{ fontWeight: "700" }}>{user?.name}</span>?
                </p>

                <div style={styles.btnRow}>
                    <button style={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button style={styles.approveBtn}>
                        Approve User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApproveUserModal;

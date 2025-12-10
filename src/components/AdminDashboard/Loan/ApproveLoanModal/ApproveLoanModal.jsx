// src/components/Admin/LoanManagement/ApproveLoanModal/ApproveLoanModal.jsx
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import styles from "../styles";

const ApproveLoanModal = ({ open, onClose, loan }) => {
    if (!loan) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box style={styles.modalWrapper}>
                <Typography style={styles.modalTitle}>
                    Loan Approval - {loan.user}
                </Typography>
                <Typography style={styles.modalText}>
                    Amount: {loan.amount}
                </Typography>
                <Typography style={styles.modalText}>
                    Current Status: {loan.status}
                </Typography>

                <Box style={styles.modalActions}>
                    <Button
                        style={{ ...styles.modalBtn, background: "#16a34a", color: "#fff" }}
                        onClick={() => {
                            // Handle Approve logic
                            onClose();
                        }}
                    >
                        Approve
                    </Button>

                    <Button
                        style={{ ...styles.modalBtn, background: "#ef4444", color: "#fff" }}
                        onClick={() => {
                            // Handle Reject logic
                            onClose();
                        }}
                    >
                        Reject
                    </Button>

                    <Button style={styles.modalBtnOutline} onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ApproveLoanModal;

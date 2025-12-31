import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import toast from "react-hot-toast";

const InvestModal = ({ open, onClose, plan, onConfirm }) => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    if (!plan) return null;

    const handleConfirm = async () => {
        const value = Number(amount);

        if (!value) {
            toast.error("Enter an amount");
            return;
        }

        if (value < plan.min_amount || value > plan.max_amount) {
            toast.error(
                `Amount must be between ₦${plan.min_amount.toLocaleString()} and ₦${plan.max_amount.toLocaleString()}`
            );
            return;
        }

        setLoading(true);

        const success = await onConfirm(value);

        setLoading(false);

        if (success) {
            setAmount("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Invest in <strong>{plan.name}</strong>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography>ROI: {plan.roi_percent}%</Typography>
                    <Typography>Duration: {plan.duration_days} days</Typography>
                    <Typography>Min: ₦{plan.min_amount.toLocaleString()}</Typography>
                    <Typography>Max: ₦{plan.max_amount.toLocaleString()}</Typography>
                </Box>

                <TextField
                    fullWidth
                    label="Investment Amount (₦)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit" disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="success"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Confirm Investment"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InvestModal;

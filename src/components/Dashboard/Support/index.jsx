import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Snackbar,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";

const SupportPage = () => {
    const { user } = useAuth();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleSubmit = async () => {
        if (!subject || !message) {
            setSnackbar({
                open: true,
                message: "Please fill all fields",
                severity: "error",
            });
            return;
        }

        try {
            setLoading(true);

            const { error } = await supabase.from("support_tickets").insert({
                user_id: user.id,
                subject,
                message,
            });

            if (error) throw error;

            setSubject("");
            setMessage("");

            setSnackbar({
                open: true,
                message: "Message sent successfully!",
                severity: "success",
            });
        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: "Failed to send message",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <Typography>Please login</Typography>;

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, p: 3 }}>
            {/* Contact Admin */}
            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Contact Support
                </Typography>

                <TextField
                    label="Subject"
                    fullWidth
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </Paper>

            {/* FAQ Section */}
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Frequently Asked Questions
                </Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>How long do withdrawals take?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Withdrawals are processed within 24–48 hours.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Is my investment safe?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Yes, all investments are handled securely and transparently.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>How do I fund my wallet?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Go to Wallet → Fund Wallet and follow the instructions.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SupportPage;

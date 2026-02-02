import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import supabase from "../../../supabase";

const TierUpgradeRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const fetchRequests = async () => {
        const { data, error } = await supabase
            .from("tier_requests")
            .select("*")
            .eq("status", "pending")
            .order("created_at", { ascending: false });

        if (!error) {
            setRequests(data);
        } else {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // ✅ APPROVE HANDLER
    const handleApprove = async (req) => {
        setLoadingId(req.id);

        try {
            // 1️⃣ Update tier request status
            const { error: requestError } = await supabase
                .from("tier_requests")
                .update({ status: "approved" })
                .eq("id", req.id);

            if (requestError) throw requestError;

            // 2️⃣ Update user's tier
            const { error: userError } = await supabase
                .from("users")
                .update({ tier: req.requested_tier })
                .eq("id", req.user_id);

            if (userError) throw userError;

            // 3️⃣ Refresh table
            fetchRequests();
        } catch (err) {
            console.error("Approve failed:", err.message);
        } finally {
            setLoadingId(null);
        }
    };

    // ❌ REJECT HANDLER
    const handleReject = async (id) => {
        setLoadingId(id);

        try {
            const { error } = await supabase
                .from("tier_requests")
                .update({ status: "rejected" })
                .eq("id", id);

            if (error) throw error;

            fetchRequests();
        } catch (err) {
            console.error("Reject failed:", err.message);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                Tier Upgrade Requests
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Current Tier</TableCell>
                        <TableCell>Requested Tier</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {requests.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No pending requests
                            </TableCell>
                        </TableRow>
                    )}

                    {requests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell>{req.user_id}</TableCell>
                            <TableCell>{req.current_tier}</TableCell>
                            <TableCell>{req.requested_tier}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ mr: 1 }}
                                    disabled={loadingId === req.id}
                                    onClick={() => handleApprove(req)}
                                >
                                    Approve
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    disabled={loadingId === req.id}
                                    onClick={() => handleReject(req.id)}
                                >
                                    Reject
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default TierUpgradeRequests;

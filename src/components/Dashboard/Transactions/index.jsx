import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    TextField,
    useMediaQuery,
    Button,
} from "@mui/material";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";

const TransactionHistoryPage = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [loading, setLoading] = useState(false);

    const isMobile = useMediaQuery("(max-width:600px)");

    if (!user) return <Typography>Please login to see your transactions</Typography>;

    // Fetch transactions
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from("transactions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (filterType !== "all") {
                query = query.eq("type", filterType);
            }

            const { data, error } = await query;

            if (error) throw error;

            setTransactions(data || []);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [user, filterType]);

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", mt: 5, p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Transaction History
            </Typography>

            {/* Filter */}
            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <TextField
                    select
                    label="Filter by Type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="funding">Funding</MenuItem>
                    <MenuItem value="withdrawal">Withdrawal</MenuItem>
                </TextField>

                <Button variant="outlined" onClick={fetchTransactions}>
                    Refresh
                </Button>
            </Box>

            <Paper>
                <TableContainer>
                    <Table size={isMobile ? "small" : "medium"}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Reference ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        {loading ? "Loading..." : "No transactions found"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>
                                            {new Date(tx.created_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ textTransform: "capitalize" }}>{tx.type}</TableCell>
                                        <TableCell>{tx.amount}</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: "bold",
                                                color:
                                                    tx.status === "pending"
                                                        ? "#f59e0b"
                                                        : tx.status === "approved"
                                                            ? "#10b981"
                                                            : "#ef4444",
                                            }}
                                        >
                                            {tx.status.toUpperCase()}
                                        </TableCell>
                                        <TableCell sx={{ wordBreak: "break-all" }}>{tx.reference_id}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default TransactionHistoryPage;

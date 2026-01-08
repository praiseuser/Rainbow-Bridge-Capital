import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    Container,
    Skeleton,
    Fade,
    alpha,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    CheckCircle,
    Cancel,
    Pending,
    AccountBalanceWallet,
    ContentCopy,
    Email,
} from "@mui/icons-material";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const AdminFundings = () => {
    const [fundings, setFundings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchFundings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("wallet_fundings")
                .select("*, user:users(email)")
                .order("created_at", { ascending: false });
            if (error) throw error;
            setFundings(data);
        } catch (err) {
            toast.error("Failed to load fundings");
        }
        setLoading(false);
    };

    useEffect(() => { fetchFundings(); }, []);

    const approveFunding = async (funding) => {
        try {
            setProcessingId(funding.id);
            toast.loading("Approving...");

            const { data: wallet, error: walletError } = await supabase
                .from("wallets")
                .select("*")
                .eq("user_id", funding.user_id)
                .single();
            if (walletError) throw walletError;

            const { error: walletUpdateError } = await supabase
                .from("wallets")
                .update({ balance: wallet.balance + funding.amount })
                .eq("user_id", funding.user_id);
            if (walletUpdateError) throw walletUpdateError;

            const { error: fundingUpdateError } = await supabase
                .from("wallet_fundings")
                .update({ status: "approved" })
                .eq("id", funding.id);
            if (fundingUpdateError) throw fundingUpdateError;

            toast.dismiss();
            toast.success("Funding approved");
            fetchFundings();
        } catch (err) {
            toast.dismiss();
            toast.error("Approval failed");
        } finally {
            setProcessingId(null);
        }
    };

    const rejectFunding = async (funding) => {
        try {
            setProcessingId(funding.id);
            const { error } = await supabase
                .from("wallet_fundings")
                .update({ status: "rejected" })
                .eq("id", funding.id);
            if (error) throw error;
            toast.success("Funding rejected");
            fetchFundings();
        } catch (err) {
            toast.error("Reject failed");
        } finally {
            setProcessingId(null);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied!");
    };

    const FundingCardSkeleton = () => (
        <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Skeleton width="60%" height={24} />
                    <Skeleton width="40%" height={20} />
                    <Skeleton width="80%" height={20} />
                </Stack>
            </CardContent>
        </Card>
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "approved": return "success";
            case "rejected": return "error";
            case "pending": return "warning";
            default: return "default";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved": return <CheckCircle />;
            case "rejected": return <Cancel />;
            case "pending": return <Pending />;
            default: return null;
        }
    };

    const stats = [
        { label: "Total Requests", value: fundings.length, bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { label: "Pending", value: fundings.filter(f => f.status === "pending").length, bg: "linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)" },
        { label: "Approved", value: fundings.filter(f => f.status === "approved").length, bg: "linear-gradient(135deg, #66bb6a 0%, #43a047 100%)" },
    ];

    return (
        <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" fontWeight={700} sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                }}>
                    Wallet Fundings
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Review and approve funding requests
                </Typography>

                {/* Stats */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
                    {stats.map((stat, i) => (
                        <Card key={i} sx={{ flex: 1, background: stat.bg, color: "white", borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h4" fontWeight={700}>
                                    {loading ? <Skeleton width={60} sx={{ bgcolor: alpha("#fff", 0.3) }} /> : stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>{stat.label}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {/* Fundings List */}
                {loading ? (
                    [1, 2, 3].map(i => <FundingCardSkeleton key={i} />)
                ) : fundings.length === 0 ? (
                    <Card sx={{ textAlign: "center", py: 8, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                        <AccountBalanceWallet sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">No funding requests found</Typography>
                    </Card>
                ) : (
                    fundings.map((f, i) => (
                        <Fade in timeout={300} style={{ transitionDelay: `${i * 50}ms` }} key={f.id}>
                            <Card sx={{
                                mb: 2,
                                borderRadius: 3,
                                background: f.status === "pending"
                                    ? "linear-gradient(135deg, #fff3e0 0%, #fff 100%)"
                                    : f.status === "approved"
                                        ? "linear-gradient(135deg, #e8f5e9 0%, #fff 100%)"
                                        : "linear-gradient(135deg, #ffebee 0%, #fff 100%)",
                                border: "1px solid",
                                borderColor: f.status === "pending"
                                    ? alpha("#ff9800", 0.3)
                                    : f.status === "approved"
                                        ? alpha("#4caf50", 0.3)
                                        : alpha("#f44336", 0.3),
                                transition: "all 0.3s ease",
                                position: "relative",
                                overflow: "hidden",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: 3,
                                    background: f.status === "pending"
                                        ? "linear-gradient(90deg, #ffa726 0%, #fb8c00 100%)"
                                        : f.status === "approved"
                                            ? "linear-gradient(90deg, #66bb6a 0%, #43a047 100%)"
                                            : "linear-gradient(90deg, #ef5350 0%, #e53935 100%)",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                },
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 40px rgba(102,126,234,0.2)",
                                    "&::before": { opacity: 1 },
                                },
                            }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                                        {/* Left Section */}
                                        <Box sx={{ flex: 1 }}>
                                            <Stack spacing={2}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Email sx={{ fontSize: 18, color: "text.secondary" }} />
                                                    <Typography variant="body1" fontWeight={600}>
                                                        {f.user?.email || "Unknown"}
                                                    </Typography>
                                                </Stack>

                                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">Amount</Typography>
                                                        <Typography variant="h6" fontWeight={700} color="primary">
                                                            ${f.amount.toLocaleString()}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">Status</Typography>
                                                        <Box mt={0.5}>
                                                            <Chip
                                                                icon={getStatusIcon(f.status)}
                                                                label={f.status}
                                                                color={getStatusColor(f.status)}
                                                                size="small"
                                                                sx={{ fontWeight: 600, textTransform: "capitalize" }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Stack>

                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">Crypto Wallet</Typography>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 300 }}>
                                                            {f.crypto_wallet}
                                                        </Typography>
                                                        <Tooltip title="Copy">
                                                            <IconButton size="small" onClick={() => copyToClipboard(f.crypto_wallet)}>
                                                                <ContentCopy sx={{ fontSize: 16 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </Box>

                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">Transaction Hash</Typography>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 300 }}>
                                                            {f.tx_hash}
                                                        </Typography>
                                                        <Tooltip title="Copy">
                                                            <IconButton size="small" onClick={() => copyToClipboard(f.tx_hash)}>
                                                                <ContentCopy sx={{ fontSize: 16 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </Box>

                                        {/* Right Section - Actions */}
                                        {f.status === "pending" && (
                                            <Stack spacing={1.5} justifyContent="center" sx={{ minWidth: 140 }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    startIcon={<CheckCircle />}
                                                    onClick={() => approveFunding(f)}
                                                    disabled={processingId === f.id}
                                                    sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                                                >
                                                    {processingId === f.id ? "Processing..." : "Approve"}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<Cancel />}
                                                    onClick={() => rejectFunding(f)}
                                                    disabled={processingId === f.id}
                                                    sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Fade>
                    ))
                )}
            </Container>
        </Box>
    );
};

export default AdminFundings;
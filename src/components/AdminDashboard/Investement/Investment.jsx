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
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Pending,
  TrendingUp,
  Email,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const AdminInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("investments")
        .select(`id, amount, roi_amount, status, start_date, end_date, created_at, user:users(email)`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setInvestments(data);
    } catch (err) {
      toast.error("Failed to load investments");
    }
    setLoading(false);
  };

  useEffect(() => { fetchInvestments(); }, []);

  const updateStatus = async (investment, newStatus) => {
    try {
      setProcessingId(investment.id);

      if (newStatus === "completed") {
        const { data: wallet, error: walletError } = await supabase
          .from("wallets")
          .select("*")
          .eq("user_id", investment.user_id)
          .single();
        if (walletError) throw walletError;

        const { error: walletUpdateError } = await supabase
          .from("wallets")
          .update({ balance: wallet.balance + investment.roi_amount })
          .eq("user_id", investment.user_id);
        if (walletUpdateError) throw walletUpdateError;
      }

      const { error } = await supabase
        .from("investments")
        .update({ status: newStatus })
        .eq("id", investment.id);
      if (error) throw error;

      toast.success(newStatus === "completed" ? "Investment completed & ROI credited" : `Investment ${newStatus}`);
      fetchInvestments();
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  const InvestmentCardSkeleton = () => (
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
      case "completed": return "success";
      case "active": return "info";
      case "rejected": return "error";
      case "pending": return "warning";
      default: return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle />;
      case "active": return <TrendingUp />;
      case "rejected": return <Cancel />;
      case "pending": return <Pending />;
      default: return null;
    }
  };

  const stats = [
    { label: "Total", value: investments.length, bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { label: "Active", value: investments.filter(i => i.status === "active").length, bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { label: "Completed", value: investments.filter(i => i.status === "completed").length, bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
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
          Investment Monitoring
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track and manage all investment activities
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

        {/* Investments List */}
        {loading ? (
          [1, 2, 3].map(i => <InvestmentCardSkeleton key={i} />)
        ) : investments.length === 0 ? (
          <Card sx={{ textAlign: "center", py: 8, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <TrendingUp sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">No investments found</Typography>
          </Card>
        ) : (
          investments.map((inv, i) => (
            <Fade in timeout={300} style={{ transitionDelay: `${i * 50}ms` }} key={inv.id}>
              <Card sx={{
                mb: 2,
                borderRadius: 3,
                background: inv.status === "pending"
                  ? "linear-gradient(135deg, #fff3e0 0%, #fff 100%)"
                  : inv.status === "active"
                    ? "linear-gradient(135deg, #e1f5fe 0%, #fff 100%)"
                    : inv.status === "completed"
                      ? "linear-gradient(135deg, #e8f5e9 0%, #fff 100%)"
                      : "linear-gradient(135deg, #ffebee 0%, #fff 100%)",
                border: "1px solid",
                borderColor: inv.status === "pending"
                  ? alpha("#ff9800", 0.3)
                  : inv.status === "active"
                    ? alpha("#2196f3", 0.3)
                    : inv.status === "completed"
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
                  background: inv.status === "pending"
                    ? "linear-gradient(90deg, #ffa726 0%, #fb8c00 100%)"
                    : inv.status === "active"
                      ? "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)"
                      : inv.status === "completed"
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
                            {inv.user?.email || "Unknown"}
                          </Typography>
                          <Chip
                            icon={getStatusIcon(inv.status)}
                            label={inv.status}
                            color={getStatusColor(inv.status)}
                            size="small"
                            sx={{ fontWeight: 600, textTransform: "capitalize", ml: 1 }}
                          />
                        </Stack>

                        <Stack direction="row" spacing={3} flexWrap="wrap">
                          <Box>
                            <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
                              <AttachMoney sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">Investment</Typography>
                            </Stack>
                            <Typography variant="h6" fontWeight={700} color="primary">
                              ${inv.amount.toLocaleString()}
                            </Typography>
                          </Box>

                          <Box>
                            <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
                              <TrendingUp sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">ROI</Typography>
                            </Stack>
                            <Typography variant="h6" fontWeight={700} color="success.main">
                              ${inv.roi_amount.toLocaleString()}
                            </Typography>
                          </Box>
                        </Stack>

                        <Divider />

                        <Stack direction="row" spacing={3} flexWrap="wrap">
                          <Box>
                            <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
                              <CalendarToday sx={{ fontSize: 14, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">Start Date</Typography>
                            </Stack>
                            <Typography variant="body2" fontWeight={500}>
                              {new Date(inv.start_date).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Box>
                            <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
                              <CalendarToday sx={{ fontSize: 14, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">End Date</Typography>
                            </Stack>
                            <Typography variant="body2" fontWeight={500}>
                              {new Date(inv.end_date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>

                    {/* Right Section - Actions */}
                    <Stack spacing={1.5} justifyContent="center" sx={{ minWidth: 140 }}>
                      {inv.status === "pending" && (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircle />}
                            onClick={() => updateStatus(inv, "active")}
                            disabled={processingId === inv.id}
                            sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                          >
                            {processingId === inv.id ? "Processing..." : "Approve"}
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() => updateStatus(inv, "rejected")}
                            disabled={processingId === inv.id}
                            sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {inv.status === "active" && (
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => updateStatus(inv, "completed")}
                          disabled={processingId === inv.id}
                          sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                        >
                          {processingId === inv.id ? "Processing..." : "Complete"}
                        </Button>
                      )}
                    </Stack>
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

export default AdminInvestments;
import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
  Button,
  Chip,
  Stack,
  Container,
  Skeleton,
  TableContainer,
  IconButton,
  alpha,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  ArrowBack,
  ArrowForward,
  FilterList,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all");
  const [totalCount, setTotalCount] = useState(0);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("transactions")
        .select(`*, user:users(email)`, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      if (typeFilter !== "all") query = query.eq("type", typeFilter);

      const { data, error, count } = await query;
      if (error) throw error;

      setTransactions(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, [page, typeFilter]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const getTypeIcon = (type) => {
    switch (type) {
      case "funding": return <TrendingUp />;
      case "withdrawal": return <TrendingDown />;
      case "investment": return <AccountBalance />;
      default: return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "funding": return "success";
      case "withdrawal": return "error";
      case "investment": return "info";
      default: return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed": case "success": return "success";
      case "pending": return "warning";
      case "failed": case "rejected": return "error";
      default: return "default";
    }
  };

  const TableRowSkeleton = () => (
    <TableRow>
      {[1, 2, 3, 4, 5].map((i) => (
        <TableCell key={i}>
          <Skeleton width="80%" height={24} />
        </TableCell>
      ))}
    </TableRow>
  );

  const stats = [
    { label: "Total", value: totalCount, bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { label: "Funding", value: transactions.filter(t => t.type === "funding").length, bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { label: "Withdrawals", value: transactions.filter(t => t.type === "withdrawal").length, bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
  ];

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Typography variant="h4" fontWeight={700} sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}>
          Transaction History
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Monitor all financial transactions
        </Typography>

        {/* Stats */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
          {stats.map((stat, i) => (
            <Card key={i} sx={{ flex: 1, background: stat.bg, color: "white", borderRadius: 3 }}>
              <Box sx={{ p: 2.5 }}>
                <Typography variant="h4" fontWeight={700}>
                  {loading ? <Skeleton width={60} sx={{ bgcolor: alpha("#fff", 0.3) }} /> : stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{stat.label}</Typography>
              </Box>
            </Card>
          ))}
        </Stack>

        {/* Filter */}
        <Card sx={{ mb: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
          <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
            <FilterList sx={{ color: "text.secondary" }} />
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              Filter by type:
            </Typography>
            <Select
              value={typeFilter}
              onChange={(e) => {
                setPage(0);
                setTypeFilter(e.target.value);
              }}
              size="small"
              sx={{ minWidth: 150, borderRadius: 2 }}
            >
              <MenuItem value="all">All Transactions</MenuItem>
              <MenuItem value="funding">Funding</MenuItem>
              <MenuItem value="withdrawal">Withdrawal</MenuItem>
              <MenuItem value="investment">Investment</MenuItem>
            </Select>
          </Box>
        </Card>

        {/* Table */}
        <Card sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: alpha("#667eea", 0.08) }}>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  [1, 2, 3, 4, 5].map((i) => <TableRowSkeleton key={i} />)
                ) : transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Typography color="text.secondary">No transactions found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((tx, i) => (
                    <TableRow 
                      key={tx.id}
                      sx={{
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: alpha("#667eea", 0.04),
                          transform: "scale(1.005)",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {tx.user?.email || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getTypeIcon(tx.type)}
                          label={tx.type}
                          color={getTypeColor(tx.type)}
                          size="small"
                          sx={{ fontWeight: 600, textTransform: "capitalize" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} color="text.primary">
                          ${tx.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={tx.status}
                          color={getStatusColor(tx.status)}
                          size="small"
                          sx={{ fontWeight: 600, textTransform: "capitalize" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(tx.created_at).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(tx.created_at).toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {!loading && transactions.length > 0 && (
            <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid", borderColor: "divider" }}>
              <Button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                startIcon={<ArrowBack />}
                sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
              >
                Previous
              </Button>

              <Typography variant="body2" fontWeight={600} color="text.secondary">
                Page {page + 1} of {totalPages}
              </Typography>

              <Button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                endIcon={<ArrowForward />}
                sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
              >
                Next
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default AdminTransactions;
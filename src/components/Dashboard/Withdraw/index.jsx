import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Skeleton,
  Fade,
  Chip,
  Grid,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Send,
  History,
  CheckCircle,
  Schedule,
  Cancel,
  TrendingDown,
  Warning,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import { PLATFORM_WALLETS } from "../../../constants/wallets";
import { styles } from "./styles";

const WithdrawalPage = () => {
  const { user } = useAuth();
  const [coinKey, setCoinKey] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);

  const wallet = PLATFORM_WALLETS[coinKey];

  // Fetch user balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const { data, error } = await supabase
          .from("wallets")
          .select("balance")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setUserBalance(data.balance || 0);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setUserBalance(0);
      }
    };

    if (user) fetchBalance();
  }, [user]);

  // Fetch user withdrawal history
  useEffect(() => {
    const fetchWithdrawals = async () => {
      setPageLoading(true);
      try {
        const { data, error } = await supabase
          .from("withdrawals")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setWithdrawals(data);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
        setWithdrawals([]);
      } finally {
        setPageLoading(false);
      }
    };

    if (user) fetchWithdrawals();
  }, [user, loading]);

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0 || !destAddress) {
      toast.error("Please fill all fields correctly");
      return;
    }

    if (Number(amount) > userBalance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("withdrawals").insert({
        user_id: user.id,
        coin: wallet.coin,
        network: wallet.network,
        amount: Number(amount),
        wallet_address: destAddress,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Withdrawal request submitted. Awaiting admin approval.");
      setAmount("");
      setDestAddress("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit withdrawal request");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: "Pending",
        color: "#f59e0b",
        bgColor: "#fef3c7",
        icon: Schedule,
      },
      approved: {
        label: "Approved",
        color: "#10b981",
        bgColor: "#d1fae5",
        icon: CheckCircle,
      },
      rejected: {
        label: "Rejected",
        color: "#ef4444",
        bgColor: "#fee2e2",
        icon: Cancel,
      },
    };
    return configs[status] || configs.pending;
  };

  if (!user) {
    return (
      <Box sx={styles.errorContainer}>
        <AccountBalanceWallet sx={{ fontSize: 80, color: "#cbd5e1", mb: 2 }} />
        <Typography variant="h5" sx={{ color: "#64748b", fontWeight: 700 }}>
          Please Login
        </Typography>
        <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1 }}>
          You need to be logged in to withdraw funds
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="lg">
        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={styles.header}>
            <Typography variant="h3" sx={styles.pageTitle}>
              Withdraw Funds
            </Typography>
            <Typography variant="body1" sx={styles.pageSubtitle}>
              Request crypto withdrawals to your wallet
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Withdrawal Form */}
          <Grid item xs={12} md={5}>
            <Fade in timeout={800}>
              <Card sx={styles.formCard}>
                <Box sx={styles.formCardHeader}>
                  <Box sx={styles.formIconWrapper}>
                    <Send sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                  <Typography variant="h5" sx={styles.formCardTitle}>
                    New Withdrawal
                  </Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  {/* Balance Display */}
                  <Box sx={styles.balanceBox}>
                    <Typography variant="body2" sx={styles.balanceLabel}>
                      Available Balance
                    </Typography>
                    <Typography variant="h4" sx={styles.balanceAmount}>
                      ₦{userBalance.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Select Coin */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={styles.fieldLabel}>
                      Select Cryptocurrency
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={coinKey}
                      onChange={(e) => setCoinKey(e.target.value)}
                      sx={styles.selectField}
                    >
                      {Object.entries(PLATFORM_WALLETS).map(([key, w]) => (
                        <MenuItem key={key} value={key}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={styles.coinIcon}>
                              {w.coin.charAt(0)}
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                                {w.coin}
                              </Typography>
                              <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                                {w.network}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  {/* Amount */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={styles.fieldLabel}>
                      Withdrawal Amount
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={styles.currencySymbol}>₦</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={styles.amountInput}
                    />
                  </Box>

                  {/* Destination Address */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={styles.fieldLabel}>
                      Destination Wallet Address
                    </Typography>
                    <TextField
                      fullWidth
                      value={destAddress}
                      onChange={(e) => setDestAddress(e.target.value)}
                      placeholder="Enter wallet address"
                      sx={styles.addressInput}
                    />
                  </Box>

                  {/* Warning */}
                  <Alert severity="warning" sx={styles.warningAlert}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Double-check your wallet address! Wrong address = permanent loss.
                    </Typography>
                  </Alert>

                  {/* Submit Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || !amount || !destAddress}
                    startIcon={<TrendingDown />}
                    sx={styles.submitButton}
                  >
                    {loading ? "Processing..." : "Submit Withdrawal"}
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Withdrawal History */}
          <Grid item xs={12} md={7}>
            <Fade in timeout={1000}>
              <Card sx={styles.historyCard}>
                <Box sx={styles.historyHeader}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={styles.historyIconWrapper}>
                      <History sx={{ fontSize: 28, color: "white" }} />
                    </Box>
                    <Typography variant="h5" sx={styles.historyTitle}>
                      Withdrawal History
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  {pageLoading ? (
                    <Box>
                      {[1, 2, 3].map((i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                          <Skeleton variant="rounded" height={120} />
                        </Box>
                      ))}
                    </Box>
                  ) : withdrawals.length === 0 ? (
                    <Box sx={styles.emptyState}>
                      <History sx={{ fontSize: 60, color: "#cbd5e1", mb: 2 }} />
                      <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 600 }}>
                        No withdrawals yet
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
                        Your withdrawal history will appear here
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={styles.withdrawalsList}>
                      {withdrawals.map((withdrawal, index) => {
                        const statusConfig = getStatusConfig(withdrawal.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                          <Fade in timeout={300 + index * 100} key={withdrawal.id}>
                            <Card sx={styles.withdrawalItem}>
                              <CardContent sx={{ p: 3 }}>
                                <Box sx={styles.withdrawalHeader}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Box sx={styles.withdrawalCoinIcon}>
                                      {withdrawal.coin.charAt(0)}
                                    </Box>
                                    <Box>
                                      <Typography sx={styles.withdrawalCoin}>
                                        {withdrawal.coin}
                                      </Typography>
                                      <Typography sx={styles.withdrawalDate}>
                                        {new Date(withdrawal.created_at).toLocaleString()}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Chip
                                    icon={<StatusIcon />}
                                    label={statusConfig.label}
                                    sx={styles.statusChip(statusConfig)}
                                  />
                                </Box>

                                <Box sx={styles.withdrawalDetails}>
                                  <Box sx={styles.detailRow}>
                                    <Typography sx={styles.detailLabel}>Amount</Typography>
                                    <Typography sx={styles.detailValue}>
                                      ₦{withdrawal.amount.toLocaleString()}
                                    </Typography>
                                  </Box>
                                  <Box sx={styles.detailRow}>
                                    <Typography sx={styles.detailLabel}>Network</Typography>
                                    <Typography sx={styles.detailValue}>
                                      {withdrawal.network}
                                    </Typography>
                                  </Box>
                                  <Box sx={styles.detailRow}>
                                    <Typography sx={styles.detailLabel}>Address</Typography>
                                    <Typography sx={styles.detailValueAddress}>
                                      {withdrawal.wallet_address}
                                    </Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Fade>
                        );
                      })}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WithdrawalPage;
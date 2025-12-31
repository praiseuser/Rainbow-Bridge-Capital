import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import { PLATFORM_WALLETS } from "../../../constants/wallets";

const WithdrawalPage = () => {
  const { user } = useAuth();
  const [coinKey, setCoinKey] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");

  if (!user) return <Typography>Please login to withdraw funds</Typography>;

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

    fetchBalance();
  }, [user]);

  // Fetch user withdrawal history
  useEffect(() => {
    const fetchWithdrawals = async () => {
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
      }
    };

    fetchWithdrawals();
  }, [user, loading]); // refresh when a new withdrawal is submitted

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

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 3 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Withdraw Funds (Crypto)
        </Typography>

        {/* Coin Selector */}
        <TextField
          select
          fullWidth
          label="Select Coin"
          value={coinKey}
          onChange={(e) => setCoinKey(e.target.value)}
          sx={{ mb: 2 }}
        >
          {Object.entries(PLATFORM_WALLETS).map(([key, w]) => (
            <MenuItem key={key} value={key}>
              {w.coin} ({w.network})
            </MenuItem>
          ))}
        </TextField>

        {/* Available Balance */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          Available Balance: {userBalance} {wallet.coin}
        </Typography>

        {/* Amount */}
        <TextField
          fullWidth
          type="number"
          label="Amount to Withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Destination Wallet */}
        <TextField
          fullWidth
          label="Destination Wallet Address"
          value={destAddress}
          onChange={(e) => setDestAddress(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Info */}
        <Typography variant="caption" sx={{ display: "block", mb: 2 }} color="textSecondary">
          Enter the amount you want to withdraw and your destination wallet address. Admin will review and approve the withdrawal manually.
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? "Submitting..." : "Submit Withdrawal"}
        </Button>
      </Paper>

      {/* Withdrawal History Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Withdrawal History
        </Typography>

        <TableContainer>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Wallet Address</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No withdrawals yet
                  </TableCell>
                </TableRow>
              ) : (
                withdrawals.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell>
                      {new Date(w.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>{w.coin}</TableCell>
                    <TableCell>{w.amount}</TableCell>
                    <TableCell sx={{ wordBreak: "break-all" }}>
                      {w.wallet_address}
                    </TableCell>
                    <TableCell
                      sx={{
                        color:
                          w.status === "pending"
                            ? "#f59e0b"
                            : w.status === "approved"
                            ? "#10b981"
                            : "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      {w.status.toUpperCase()}
                    </TableCell>
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

export default WithdrawalPage;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Fade,
  InputAdornment,
  Alert,
  Chip,
} from "@mui/material";
import {
  Close,
  AccountBalanceWallet,
  ContentCopy,
  CheckCircle,
  Warning,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../supabase";
import { PLATFORM_WALLETS } from "../../constants/wallets";
import { styles } from "./styles";

const WalletFundModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [coinKey, setCoinKey] = useState("USDT_TRC20");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const wallet = PLATFORM_WALLETS[coinKey];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!wallet) {
      toast.error("Invalid wallet selected");
      return;
    }

    if (!amount || Number(amount) <= 0 || !txHash) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("wallet_fundings").insert({
        user_id: user.id,
        amount_usd: Number(amount),
        crypto_network: wallet.network,
        wallet_address: wallet.address,
        tx_hash: txHash,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Funding request submitted. Awaiting admin approval.");
      setAmount("");
      setTxHash("");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit funding request");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setTxHash("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header Section */}
        <Box sx={styles.header}>
          <IconButton onClick={handleClose} sx={styles.closeButton}>
            <Close />
          </IconButton>

          <Fade in={open} timeout={800}>
            <Box sx={styles.headerContent}>
              <Box sx={styles.iconWrapper}>
                <AccountBalanceWallet sx={{ fontSize: 36, color: "white" }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={styles.headerTitle}>
                  Fund Wallet
                </Typography>
                <Typography variant="body2" sx={styles.headerSubtitle}>
                  Add crypto to your wallet instantly
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Box>

        {/* Content Section */}
        <Box sx={styles.contentSection}>
          {/* Select Coin */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={styles.sectionLabel}>
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
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
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

          {/* Wallet Address Card */}
          <Box sx={styles.addressCard}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" sx={styles.sectionLabel}>
                Deposit Address
              </Typography>
              <Chip
                label={wallet.network}
                size="small"
                sx={styles.networkChip}
              />
            </Box>

            <Box sx={styles.addressBox}>
              <Typography sx={styles.addressText}>
                {wallet.address}
              </Typography>
              <IconButton onClick={handleCopyAddress} sx={styles.copyButton}>
                {copied ? (
                  <CheckCircle sx={{ fontSize: 20, color: "#10b981" }} />
                ) : (
                  <ContentCopy sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Box>

            <Alert severity="warning" sx={styles.warningAlert}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                ⚠️ Send only {wallet.coin} via {wallet.network}. Wrong coin/network = permanent loss!
              </Typography>
            </Alert>
          </Box>

          {/* Amount Input */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={styles.sectionLabel}>
              Enter Amount (USD)
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
                    <Typography sx={styles.currencySymbol}>$</Typography>
                  </InputAdornment>
                ),
              }}
              sx={styles.amountInput}
            />
          </Box>

          {/* Transaction Hash */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={styles.sectionLabel}>
              Transaction Hash (TXID)
            </Typography>
            <TextField
              fullWidth
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="Enter transaction hash"
              sx={styles.txHashInput}
            />
            <Typography variant="caption" sx={styles.helpText}>
              Copy the Transaction Hash from your wallet after sending the crypto
            </Typography>
          </Box>

          {/* Security Badge */}
          <Box sx={styles.securityBadge}>
            <CheckCircle sx={{ fontSize: 20, color: "#10b981" }} />
            <Typography variant="body2" sx={styles.securityText}>
              Your transaction will be verified by our admin team
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClose}
              sx={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !amount || !txHash}
              sx={styles.submitButton}
            >
              {loading ? "Submitting..." : "Submit Proof"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WalletFundModal;
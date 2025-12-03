import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Wallet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  const balance = "₦4,200";
  const pendingBalance = "₦1,500";

  const transactions = [
    {
      id: 1,
      type: "Deposit",
      amount: "₦500",
      date: "Dec 1, 2024",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: 2,
      type: "Withdraw",
      amount: "₦200",
      date: "Dec 2, 2024",
      time: "02:15 PM",
      status: "Completed",
    },
    {
      id: 3,
      type: "Deposit",
      amount: "₦1,000",
      date: "Dec 3, 2024",
      time: "09:45 AM",
      status: "Pending",
    },
    {
      id: 4,
      type: "Withdraw",
      amount: "₦300",
      date: "Dec 4, 2024",
      time: "04:20 PM",
      status: "Completed",
    },
  ];

  return (
    <Box sx={styles.container}>
      {/* Balance Cards */}
      <Box sx={styles.balanceGrid}>
        {/* Main Balance Card */}
        <Paper elevation={0} sx={styles.balanceCard}>
          <Box sx={styles.balanceHeader}>
            <Box sx={styles.iconWrapper}>
              <AccountBalanceWalletIcon sx={styles.icon} />
            </Box>
            <Chip
              label="Active"
              size="small"
              sx={{
                ...styles.statusChip,
                background: `${theme.palette.accent.gold}20`,
                color: theme.palette.accent.gold,
              }}
            />
          </Box>
          <Typography sx={styles.balanceLabel}>Available Balance</Typography>
          <Typography sx={styles.balanceAmount}>{balance}</Typography>
          <Box sx={styles.buttonGroup}>
            <Button variant="contained" fullWidth sx={styles.depositBtn}>
              <ArrowDownwardIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
              Deposit
            </Button>
            <Button variant="outlined" fullWidth sx={styles.withdrawBtn}>
              <ArrowUpwardIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
              Withdraw
            </Button>
          </Box>
        </Paper>

        {/* Pending Balance Card */}
        <Paper elevation={0} sx={styles.pendingCard}>
          <Box sx={styles.pendingHeader}>
            <Box sx={{ ...styles.iconWrapper, background: `${theme.palette.accent.coral}20` }}>
              <TrendingUpIcon sx={{ ...styles.icon, color: theme.palette.accent.coral }} />
            </Box>
          </Box>
          <Typography sx={styles.balanceLabel}>Pending Balance</Typography>
          <Typography sx={{ ...styles.balanceAmount, color: theme.palette.accent.coral }}>
            {pendingBalance}
          </Typography>
          <Typography sx={styles.pendingNote}>
            Awaiting admin approval
          </Typography>
        </Paper>
      </Box>

      {/* Transaction History */}
      <Paper elevation={0} sx={styles.transactionPaper}>
        <Box sx={styles.transactionHeader}>
          <Typography sx={styles.transactionTitle}>Transaction History</Typography>
          <Button size="small" sx={styles.viewAllBtn}>
            View All
          </Button>
        </Box>

        <Divider sx={styles.divider} />

        <Box sx={styles.transactionList}>
          {transactions.map((tx, index) => (
            <Card
              key={tx.id}
              elevation={0}
              sx={{
                ...styles.transactionCard,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent sx={styles.transactionContent}>
                <Box sx={styles.transactionLeft}>
                  <Box
                    sx={{
                      ...styles.transactionIcon,
                      background:
                        tx.type === "Deposit"
                          ? `${theme.palette.accent.gold}20`
                          : `${theme.palette.accent.coral}20`,
                    }}
                  >
                    {tx.type === "Deposit" ? (
                      <ArrowDownwardIcon
                        sx={{
                          color: theme.palette.accent.gold,
                          fontSize: "1.5rem",
                        }}
                      />
                    ) : (
                      <ArrowUpwardIcon
                        sx={{
                          color: theme.palette.accent.coral,
                          fontSize: "1.5rem",
                        }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography sx={styles.transactionType}>{tx.type}</Typography>
                    <Typography sx={styles.transactionDate}>
                      {tx.date} • {tx.time}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.transactionRight}>
                  <Typography
                    sx={{
                      ...styles.transactionAmount,
                      color:
                        tx.type === "Deposit"
                          ? theme.palette.accent.gold
                          : theme.palette.accent.coral,
                    }}
                  >
                    {tx.type === "Deposit" ? "+" : "-"}
                    {tx.amount}
                  </Typography>
                  <Chip
                    label={tx.status}
                    size="small"
                    sx={{
                      ...styles.statusChip,
                      background:
                        tx.status === "Completed"
                          ? `${theme.palette.accent.gold}20`
                          : `${theme.palette.accent.purple}20`,
                      color:
                        tx.status === "Completed"
                          ? theme.palette.accent.gold
                          : theme.palette.accent.purple,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    p: { xs: 2, md: 3 },
  },

  balanceGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
    gap: 3,
    mb: 4,
  },

  balanceCard: {
    p: { xs: 3, md: 4 },
    borderRadius: "24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    animation: "fadeSlideUp 0.6s ease-out",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-50%",
      right: "-30%",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)",
      filter: "blur(60px)",
    },
  },

  balanceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  iconWrapper: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: "1.8rem",
    color: "#fff",
  },

  statusChip: {
    fontWeight: 700,
    fontSize: "0.75rem",
    height: "24px",
  },

  balanceLabel: {
    fontSize: "0.95rem",
    fontWeight: 500,
    opacity: 0.9,
    mb: 1,
  },

  balanceAmount: {
    fontSize: { xs: "2rem", md: "2.5rem" },
    fontWeight: 800,
    mb: 3,
  },

  buttonGroup: {
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" },
  },

  depositBtn: {
    py: 1.5,
    borderRadius: "12px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontWeight: 700,
    textTransform: "none",
    border: "1px solid rgba(255,255,255,0.3)",
    "&:hover": {
      background: "rgba(255,255,255,0.3)",
      transform: "translateY(-2px)",
    },
  },

  withdrawBtn: {
    py: 1.5,
    borderRadius: "12px",
    borderColor: "rgba(255,255,255,0.5)",
    color: "#fff",
    fontWeight: 700,
    textTransform: "none",
    borderWidth: "2px",
    "&:hover": {
      borderColor: "rgba(255,255,255,0.8)",
      background: "rgba(255,255,255,0.1)",
      transform: "translateY(-2px)",
    },
  },

  pendingCard: {
    p: { xs: 3, md: 4 },
    borderRadius: "24px",
    background: "background.paper",
    border: "2px solid",
    borderColor: "divider",
    animation: "fadeSlideUp 0.6s ease-out 0.2s backwards",
  },

  pendingHeader: {
    mb: 3,
  },

  pendingNote: {
    fontSize: "0.85rem",
    color: "text.secondary",
    mt: 1,
  },

  transactionPaper: {
    p: { xs: 2, md: 3 },
    borderRadius: "24px",
    background: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    animation: "fadeSlideUp 0.6s ease-out 0.4s backwards",
  },

  transactionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  transactionTitle: {
    fontSize: { xs: "1.1rem", md: "1.3rem" },
    fontWeight: 700,
    color: "text.primary",
  },

  viewAllBtn: {
    textTransform: "none",
    fontWeight: 600,
    color: "primary.main",
  },

  divider: {
    mb: 2,
  },

  transactionList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  transactionCard: {
    background: "transparent",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "16px",
    transition: "all 0.3s",
    animation: "fadeSlideUp 0.4s ease-out backwards",
    "&:hover": {
      transform: "translateX(8px)",
      borderColor: "primary.main",
      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.1)",
    },
  },

  transactionContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: { xs: 2, md: 2.5 },
    "&:last-child": {
      pb: { xs: 2, md: 2.5 },
    },
  },

  transactionLeft: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  transactionIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  transactionType: {
    fontSize: { xs: "0.95rem", md: "1rem" },
    fontWeight: 600,
    color: "text.primary",
  },

  transactionDate: {
    fontSize: { xs: "0.75rem", md: "0.8rem" },
    color: "text.secondary",
    mt: 0.5,
  },

  transactionRight: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 0.5,
  },

  transactionAmount: {
    fontSize: { xs: "1rem", md: "1.1rem" },
    fontWeight: 700,
  },

  "@keyframes fadeSlideUp": {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export default Wallet;
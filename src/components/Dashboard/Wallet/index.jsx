import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Skeleton,
  Fade,
  Grid,
  Chip,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Visibility,
  VisibilityOff,
  TrendingUp,
  Add,
  AccountBalance,
  History,
} from "@mui/icons-material";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";
import WalletFundModal from "../../../components/WalletFundModal";
import { styles } from "./styles";

const Wallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [openFundModal, setOpenFundModal] = useState(false);

  const fetchWallet = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        const { data: newWallet, error: insertError } = await supabase
          .from("wallets")
          .insert([{ user_id: user.id, balance: 0 }])
          .select()
          .single();

        if (insertError) throw insertError;
        setWallet(newWallet);
      } else {
        setWallet(data);
      }
    } catch (err) {
      console.error("Wallet error:", err);
      setWallet(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchWallet();
  }, [user]);

  const balance = Number(wallet?.balance || 0).toFixed(2);

  const WalletSkeleton = () => (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="md">
        <Box sx={styles.header}>
          <Skeleton variant="text" width={200} height={48} />
          <Skeleton variant="text" width={300} height={28} sx={{ mt: 1 }} />
        </Box>
        <Card sx={styles.balanceCard}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Skeleton variant="circular" width={64} height={64} />
              <Skeleton variant="circular" width={48} height={48} />
            </Box>
            <Skeleton variant="text" width="40%" height={24} />
            <Skeleton variant="text" width="60%" height={64} sx={{ mt: 1 }} />
            <Skeleton variant="rounded" width={150} height={40} sx={{ mt: 2 }} />
          </CardContent>
        </Card>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rounded" width="100%" height={80} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rounded" width="100%" height={80} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  if (loading) {
    return <WalletSkeleton />;
  }

  if (!wallet) {
    return (
      <Box sx={styles.errorContainer}>
        <AccountBalanceWallet sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#64748b', fontWeight: 700 }}>
          Wallet Unavailable
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
          Please try again later or contact support
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="md">
        {/* Background Decorations */}
        <Box sx={styles.bgDecoration}>
          <Box sx={styles.circle1} />
          <Box sx={styles.circle2} />
        </Box>

        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={styles.header}>
            <Typography variant="h3" sx={styles.pageTitle}>
              My Wallet
            </Typography>
            <Typography variant="body1" sx={styles.pageSubtitle}>
              Manage your funds and track your balance
            </Typography>
          </Box>
        </Fade>

        {/* Balance Card */}
        <Fade in timeout={800}>
          <Card sx={styles.balanceCard}>
            <Box sx={styles.balanceCardPattern} />
            <CardContent sx={{ p: { xs: 3, sm: 5 }, position: 'relative', zIndex: 2 }}>
              {/* Card Header */}
              <Box sx={styles.cardHeader}>
                <Box sx={styles.iconWrapper}>
                  <AccountBalanceWallet sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <IconButton
                  onClick={() => setShowBalance(!showBalance)}
                  sx={styles.visibilityButton}
                >
                  {showBalance ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              {/* Balance Display */}
              <Typography variant="body2" sx={styles.balanceLabel}>
                Total Balance
              </Typography>
              <Typography variant="h2" sx={styles.balanceAmount}>
                {showBalance ? `₦${Number(balance).toLocaleString()}` : "••••••••"}
              </Typography>

              {/* Status Badge */}
              <Chip
                icon={<TrendingUp />}
                label="Wallet Active"
                sx={styles.statusChip}
              />
            </CardContent>
          </Card>
        </Fade>

        {/* Quick Actions */}
        <Fade in timeout={1000}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={styles.actionCard}
                onClick={() => setOpenFundModal(true)}
              >
                <CardContent sx={styles.actionCardContent}>
                  <Box sx={styles.actionIconWrapper('#667eea')}>
                    <Add sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={styles.actionTitle}>
                      Fund Wallet
                    </Typography>
                    <Typography variant="body2" sx={styles.actionDescription}>
                      Add money to your wallet
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={styles.actionCard}>
                <CardContent sx={styles.actionCardContent}>
                  <Box sx={styles.actionIconWrapper('#10b981')}>
                    <History sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={styles.actionTitle}>
                      Transactions
                    </Typography>
                    <Typography variant="body2" sx={styles.actionDescription}>
                      View transaction history
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Fade>

        {/* Recent Activity Section */}
        <Fade in timeout={1200}>
          <Box sx={styles.activitySection}>
            <Typography variant="h5" sx={styles.sectionTitle}>
              Recent Activity
            </Typography>
            <Box sx={styles.emptyState}>
              <AccountBalance sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
              <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 600 }}>
                No recent transactions
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                Your transaction history will appear here
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Fund Wallet Modal */}
      <WalletFundModal
        open={openFundModal}
        onClose={() => {
          setOpenFundModal(false);
          fetchWallet();
        }}
      />
    </Box>
  );
};

export default Wallet;

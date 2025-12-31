// MyInvestments.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Fade,
  Grid,
  Avatar,
  Divider
} from "@mui/material";
import {
  TrendingUp,
  AccessTime,
  CheckCircle,
  Schedule,
  AccountBalanceWallet,
  Timeline,
  Celebration
} from "@mui/icons-material";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";
import { styles } from "./styles";

const MyInvestments = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchInvestments = async () => {
      const { data, error } = await supabase
        .from("investments")
        .select(`
          id,
          amount,
          roi_amount,
          status,
          start_date,
          end_date,
          investment_plans ( name )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setInvestments(data);
      setLoading(false);
    };

    fetchInvestments();
  }, [user]);

  const daysLeft = (end) => {
    const diff = new Date(end) - new Date();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const getProgress = (start, end) => {
    const total = new Date(end) - new Date(start);
    const elapsed = new Date() - new Date(start);
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        label: 'Active',
        color: '#10b981',
        bgColor: '#d1fae5',
        icon: Schedule
      },
      completed: {
        label: 'Completed',
        color: '#667eea',
        bgColor: '#e0e7ff',
        icon: CheckCircle
      },
      pending: {
        label: 'Pending',
        color: '#f59e0b',
        bgColor: '#fef3c7',
        icon: AccessTime
      }
    };
    return configs[status] || configs.pending;
  };

  const calculateStats = () => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalReturns = investments.reduce((sum, inv) => sum + inv.roi_amount, 0);
    const activeCount = investments.filter(inv => inv.status === 'active').length;

    return { totalInvested, totalReturns, activeCount };
  };

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress size={60} sx={styles.loader} />
        <Typography variant="h6" sx={{ mt: 2, color: '#667eea', fontWeight: 600 }}>
          Loading your investments...
        </Typography>
      </Box>
    );
  }

  if (investments.length === 0) {
    return (
      <Box sx={styles.emptyContainer}>
        <Box sx={styles.emptyIconWrapper}>
          <AccountBalanceWallet sx={{ fontSize: 80, color: 'white' }} />
        </Box>
        <Typography variant="h5" sx={styles.emptyTitle}>
          No Investments Yet
        </Typography>
        <Typography variant="body1" sx={styles.emptySubtitle}>
          Start your investment journey today and watch your wealth grow
        </Typography>
      </Box>
    );
  }

  const stats = calculateStats();

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={styles.headerSection}>
            <Box sx={styles.headerContent}>
              <Typography variant="h3" sx={styles.pageTitle}>
                My Investments
              </Typography>
              <Typography variant="body1" sx={styles.pageSubtitle}>
                Track and manage your investment portfolio
              </Typography>
            </Box>
          </Box>
        </Fade>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Fade in timeout={400}>
              <Card sx={styles.statCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.statIconWrapper('#667eea')}>
                    <AccountBalanceWallet sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={styles.statLabel}>
                    Total Invested
                  </Typography>
                  <Typography variant="h4" sx={styles.statValue('#667eea')}>
                    ₦{stats.totalInvested.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in timeout={600}>
              <Card sx={styles.statCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.statIconWrapper('#10b981')}>
                    <TrendingUp sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={styles.statLabel}>
                    Expected Returns
                  </Typography>
                  <Typography variant="h4" sx={styles.statValue('#10b981')}>
                    ₦{stats.totalReturns.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in timeout={800}>
              <Card sx={styles.statCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.statIconWrapper('#f59e0b')}>
                    <Timeline sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={styles.statLabel}>
                    Active Investments
                  </Typography>
                  <Typography variant="h4" sx={styles.statValue('#f59e0b')}>
                    {stats.activeCount}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        {/* Investments List */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {investments.map((inv, index) => {
            const statusConfig = getStatusConfig(inv.status);
            const StatusIcon = statusConfig.icon;
            const progress = getProgress(inv.start_date, inv.end_date);
            const days = daysLeft(inv.end_date);

            return (
              <Grid item xs={12} key={inv.id}>
                <Fade in timeout={300 + index * 100}>
                  <Card sx={styles.investmentCard}>
                    <CardContent sx={{ p: 0 }}>
                      {/* Card Header */}
                      <Box sx={styles.cardHeader}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={styles.planAvatar}>
                            {inv.investment_plans?.name?.charAt(0) || 'I'}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={styles.planName}>
                              {inv.investment_plans?.name}
                            </Typography>
                            <Typography variant="body2" sx={styles.investmentId}>
                              ID: {inv.id.slice(0, 8)}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: 18 }} />}
                          label={statusConfig.label}
                          sx={styles.statusChip(statusConfig)}
                        />
                      </Box>

                      <Divider />

                      {/* Card Body */}
                      <Box sx={styles.cardBody}>
                        <Grid container spacing={3}>
                          {/* Investment Amount */}
                          <Grid item xs={12} sm={6} md={3}>
                            <Box sx={styles.infoBox}>
                              <Typography variant="caption" sx={styles.infoLabel}>
                                Invested Amount
                              </Typography>
                              <Typography variant="h6" sx={styles.infoValue}>
                                ₦{inv.amount.toLocaleString()}
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Expected Return */}
                          <Grid item xs={12} sm={6} md={3}>
                            <Box sx={styles.infoBox}>
                              <Typography variant="caption" sx={styles.infoLabel}>
                                Expected Return
                              </Typography>
                              <Typography variant="h6" sx={styles.infoValueGreen}>
                                ₦{inv.roi_amount.toLocaleString()}
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Days Left */}
                          <Grid item xs={12} sm={6} md={3}>
                            <Box sx={styles.infoBox}>
                              <Typography variant="caption" sx={styles.infoLabel}>
                                Days Remaining
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTime sx={{ fontSize: 20, color: '#667eea' }} />
                                <Typography variant="h6" sx={styles.infoValue}>
                                  {days} {days === 1 ? 'day' : 'days'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Profit */}
                          <Grid item xs={12} sm={6} md={3}>
                            <Box sx={styles.infoBox}>
                              <Typography variant="caption" sx={styles.infoLabel}>
                                Total Profit
                              </Typography>
                              <Typography variant="h6" sx={styles.infoValueGreen}>
                                ₦{(inv.roi_amount - inv.amount).toLocaleString()}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Progress Bar */}
                        {inv.status === 'active' && (
                          <Box sx={styles.progressContainer}>
                            <Box sx={styles.progressHeader}>
                              <Typography variant="body2" sx={styles.progressLabel}>
                                Investment Progress
                              </Typography>
                              <Typography variant="body2" sx={styles.progressPercentage}>
                                {Math.round(progress)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={styles.progressBar}
                            />
                          </Box>
                        )}

                        {/* Completed Badge */}
                        {inv.status === 'completed' && (
                          <Box sx={styles.completedBanner}>
                            <Celebration sx={{ fontSize: 24, color: '#667eea' }} />
                            <Typography variant="body1" sx={styles.completedText}>
                              Investment completed successfully! Returns have been credited.
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyInvestments;
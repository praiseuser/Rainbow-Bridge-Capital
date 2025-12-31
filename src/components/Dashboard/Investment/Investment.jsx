import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Fade,
  Zoom,
  Grid
} from "@mui/material";
import {
  TrendingUp,
  AccessTime,
  AccountBalanceWallet,
  Star,
  Rocket,
  Diamond
} from "@mui/icons-material";
import supabase from "../../../supabase";
import InvestModal from "../../InvestModal";
import { useAuth } from "../../../context/AuthContext";
import { useInvest } from "../../../hooks/useInvest";
import { styles } from "./styles";

const Investment = () => {
  const { user } = useAuth();
  const { invest } = useInvest();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("investment_plans")
        .select("*")
        .eq("is_active", true);

      if (error) {
        console.error(error);
      } else {
        setPlans(data);
      }
      setLoading(false);
    };

    fetchPlans();
  }, []);

  const handleInvest = async (amount) => {
    if (!user) return;
    await invest(selectedPlan, amount, user.id);
  };

  const getPlanIcon = (index) => {
    const icons = [Star, Rocket, Diamond];
    const Icon = icons[index % icons.length];
    return <Icon sx={{ fontSize: 32 }} />;
  };

  const getPlanColor = (index) => {
    const colors = [
      { primary: '#667eea', secondary: '#764ba2' },
      { primary: '#f093fb', secondary: '#f5576c' },
      { primary: '#4facfe', secondary: '#00f2fe' }
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress size={60} sx={styles.loader} />
        <Typography variant="h6" sx={{ mt: 2, color: '#667eea', fontWeight: 600 }}>
          Loading investment plans...
        </Typography>
      </Box>
    );
  }

  if (!plans.length) {
    return (
      <Box sx={styles.emptyContainer}>
        <AccountBalanceWallet sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#64748b', fontWeight: 600 }}>
          No active investment plans available
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
          Check back soon for exciting opportunities
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in timeout={800}>
          <Box sx={styles.heroSection}>
            <Box sx={styles.heroContent}>
              <Chip 
                label="Grow Your Wealth" 
                sx={styles.heroBadge}
                icon={<TrendingUp />}
              />
              <Typography variant="h3" sx={styles.heroTitle}>
                Investment Plans
              </Typography>
              <Typography variant="body1" sx={styles.heroSubtitle}>
                Choose the perfect plan to maximize your returns and achieve your financial goals
              </Typography>
            </Box>
            <Box sx={styles.heroDecoration}>
              <Box sx={styles.decorationCircle1} />
              <Box sx={styles.decorationCircle2} />
            </Box>
          </Box>
        </Fade>

        {/* Investment Plans Grid */}
        <Grid container spacing={3} sx={{ mt: 4, mb: 6 }}>
          {plans.map((plan, index) => {
            const colors = getPlanColor(index);
            const isPopular = index === 1; // Middle plan is popular

            return (
              <Grid item xs={12} md={6} lg={4} key={plan.id}>
                <Zoom in timeout={300 + index * 100}>
                  <Card sx={styles.planCard(colors, isPopular)}>
                    {isPopular && (
                      <Chip 
                        label="Most Popular" 
                        sx={styles.popularBadge}
                        size="small"
                      />
                    )}

                    {/* Plan Header */}
                    <Box sx={styles.planHeader(colors)}>
                      <Box sx={styles.planIconWrapper}>
                        {getPlanIcon(index)}
                      </Box>
                      <Typography variant="h5" sx={styles.planName}>
                        {plan.name}
                      </Typography>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* ROI Display */}
                      <Box sx={styles.roiContainer}>
                        <Typography variant="h2" sx={styles.roiNumber(colors)}>
                          {plan.roi_percent}%
                        </Typography>
                        <Typography variant="body2" sx={styles.roiLabel}>
                          Return on Investment
                        </Typography>
                      </Box>

                      {/* Plan Details */}
                      <Box sx={styles.detailsContainer}>
                        <Box sx={styles.detailItem}>
                          <AccountBalanceWallet sx={styles.detailIcon} />
                          <Box>
                            <Typography variant="caption" sx={styles.detailLabel}>
                              Investment Range
                            </Typography>
                            <Typography variant="body1" sx={styles.detailValue}>
                              ₦{plan.min_amount.toLocaleString()} - ₦{plan.max_amount.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={styles.detailItem}>
                          <AccessTime sx={styles.detailIcon} />
                          <Box>
                            <Typography variant="caption" sx={styles.detailLabel}>
                              Duration
                            </Typography>
                            <Typography variant="body1" sx={styles.detailValue}>
                              {plan.duration_days} days
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Invest Button */}
                      <Button
                        fullWidth
                        variant="contained"
                        sx={styles.investButton(colors)}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setOpenModal(true);
                        }}
                      >
                        Invest Now
                      </Button>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <InvestModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        plan={selectedPlan}
        onConfirm={handleInvest}
      />
    </Box>
  );
};

export default Investment;
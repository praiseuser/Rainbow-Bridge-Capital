import React from "react";
import { Box, Typography, Paper, Button, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Investment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  const plans = [
    {
      name: "Short-Term",
      roi: "5% monthly",
      icon: <AccountBalanceWalletIcon />,
      color: theme.palette.accent.gold,
      popular: false,
    },
    {
      name: "Long-Term",
      roi: "12% yearly",
      icon: <TrendingUpIcon />,
      color: theme.palette.accent.coral,
      popular: true,
    },
    {
      name: "Crypto",
      roi: "High Returns",
      icon: <CurrencyBitcoinIcon />,
      color: theme.palette.accent.purple,
      popular: false,
    },
    {
      name: "Stock Market",
      roi: "8% yearly",
      icon: <ShowChartIcon />,
      color: theme.palette.primary.main,
      popular: false,
    },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Growth ($)",
        data: [1200, 1500, 1800, 2100, 2500, 3000],
        fill: true,
        backgroundColor: isDark
          ? `${theme.palette.accent.gold}30`
          : `${theme.palette.accent.gold}20`,
        borderColor: theme.palette.accent.gold,
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: theme.palette.accent.gold,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: theme.palette.accent.coral,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 1500,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: theme.palette.text.primary,
          font: {
            size: 14,
            family: theme.typography.fontFamily,
            weight: 600,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: isDark
          ? "rgba(26, 31, 58, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.accent.gold,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Growth: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
        grid: {
          color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Investment Plans</Typography>
        <Typography sx={styles.subtitle}>
          Choose the perfect plan to grow your wealth
        </Typography>
      </Box>

      {/* Investment Plans Grid */}
      <Box sx={styles.plansGrid}>
        {plans.map((plan, index) => (
          <Paper
            key={plan.name}
            elevation={0}
            sx={{
              ...styles.planCard,
              background: isDark
                ? `linear-gradient(135deg, ${plan.color}15, ${plan.color}05)`
                : `linear-gradient(135deg, ${plan.color}10, ${plan.color}05)`,
              borderColor: `${plan.color}40`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <Chip
                label="Popular"
                sx={styles.popularBadge}
                size="small"
              />
            )}

            {/* Icon */}
            <Box
              sx={{
                ...styles.iconWrapper,
                background: `${plan.color}20`,
              }}
            >
              {React.cloneElement(plan.icon, {
                sx: { fontSize: "2rem", color: plan.color },
              })}
            </Box>

            {/* Plan Details */}
            <Typography sx={styles.planName}>{plan.name}</Typography>
            <Typography sx={styles.planRoi}>{plan.roi}</Typography>

            {/* Buttons */}
            <Box sx={styles.buttonGroup}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  ...styles.investBtn,
                  background: `linear-gradient(135deg, ${plan.color}, ${theme.palette.accent.pink})`,
                }}
              >
                Invest Now
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  ...styles.depositBtn,
                  borderColor: plan.color,
                  color: plan.color,
                  "&:hover": {
                    borderColor: plan.color,
                    background: `${plan.color}10`,
                  },
                }}
              >
                50% Deposit
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Portfolio Growth Section */}
      <Box sx={styles.chartSection}>
        <Box sx={styles.chartHeader}>
          <Box>
            <Typography sx={styles.chartTitle}>Portfolio Growth</Typography>
            <Typography sx={styles.chartSubtitle}>
              Track your investment performance over time
            </Typography>
          </Box>
          <Box sx={styles.statsBox}>
            <Typography sx={styles.statValue}>+150%</Typography>
            <Typography sx={styles.statLabel}>Total Growth</Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={styles.chartPaper}>
          <Line data={chartData} options={chartOptions} />
        </Paper>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    p: { xs: 2, md: 4 },
  },

  header: {
    mb: 4,
    textAlign: "center",
  },

  title: {
    fontSize: { xs: "1.5rem", md: "2rem" },
    fontWeight: 800,
    background: "linear-gradient(135deg, #ffd700, #ff6b6b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 1,
  },

  subtitle: {
    fontSize: { xs: "0.9rem", md: "1rem" },
    color: "text.secondary",
  },

  plansGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
    },
    gap: 3,
    mb: 6,
  },

  planCard: {
    p: 3,
    borderRadius: "20px",
    border: "2px solid",
    position: "relative",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: "fadeSlideUp 0.6s ease-out backwards",
    backdropFilter: "blur(20px)",
    "&:hover": {
      transform: "translateY(-10px) scale(1.02)",
      boxShadow: "0 20px 40px rgba(255, 215, 0, 0.2)",
    },
  },

  popularBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "linear-gradient(135deg, #ffd700, #ff6b6b)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.7rem",
  },

  iconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
  },

  planName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "text.primary",
    mb: 0.5,
  },

  planRoi: {
    fontSize: "0.95rem",
    color: "text.secondary",
    mb: 3,
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },

  investBtn: {
    py: 1.5,
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(255, 215, 0, 0.4)",
    },
  },

  depositBtn: {
    py: 1.5,
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.95rem",
    borderWidth: "2px",
  },

  chartSection: {
    mt: 6,
  },

  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    flexWrap: "wrap",
    gap: 2,
  },

  chartTitle: {
    fontSize: { xs: "1.3rem", md: "1.5rem" },
    fontWeight: 700,
    color: "text.primary",
  },

  chartSubtitle: {
    fontSize: "0.9rem",
    color: "text.secondary",
  },

  statsBox: {
    textAlign: "right",
  },

  statValue: {
    fontSize: { xs: "1.5rem", md: "2rem" },
    fontWeight: 800,
    background: "linear-gradient(135deg, #ffd700, #ff6b6b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  statLabel: {
    fontSize: "0.8rem",
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  chartPaper: {
    p: { xs: 2, md: 4 },
    borderRadius: "20px",
    background: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    backdropFilter: "blur(20px)",
  },

  "@keyframes fadeSlideUp": {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export default Investment;
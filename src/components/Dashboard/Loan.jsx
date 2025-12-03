import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Grid,
  MenuItem,
  IconButton,
  Collapse,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const LoanSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  const [showForm, setShowForm] = useState(false);
  const [expandedLoan, setExpandedLoan] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    duration: "",
    purpose: "",
  });

  const loanTypes = [
    { value: "personal", label: "Personal Loan", rate: "5%" },
    { value: "business", label: "Business Loan", rate: "7%" },
    { value: "emergency", label: "Emergency Loan", rate: "8%" },
  ];

  const durations = [
    { value: "3", label: "3 Months" },
    { value: "6", label: "6 Months" },
    { value: "12", label: "12 Months" },
    { value: "24", label: "24 Months" },
  ];

  const loanApplications = [
    {
      id: 1,
      amount: "₦50,000",
      type: "Personal Loan",
      status: "Approved",
      date: "Dec 1, 2024",
      duration: "6 months",
      interest: "5%",
      totalRepayment: "₦52,500",
      repaid: "₦20,000",
      remaining: "₦32,500",
      nextPayment: "Jan 15, 2025",
      progress: 38,
    },
    {
      id: 2,
      amount: "₦100,000",
      type: "Business Loan",
      status: "Pending",
      date: "Dec 10, 2024",
      duration: "12 months",
      interest: "7%",
      totalRepayment: "₦107,000",
    },
    {
      id: 3,
      amount: "₦30,000",
      type: "Emergency Loan",
      status: "Rejected",
      date: "Nov 25, 2024",
      duration: "3 months",
      interest: "8%",
      reason: "Insufficient credit score",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loan Application:", formData);
    // Handle form submission
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircleIcon sx={{ color: theme.palette.accent.gold }} />;
      case "Pending":
        return <PendingIcon sx={{ color: theme.palette.accent.purple }} />;
      case "Rejected":
        return <CancelIcon sx={{ color: theme.palette.accent.coral }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return theme.palette.accent.gold;
      case "Pending":
        return theme.palette.accent.purple;
      case "Rejected":
        return theme.palette.accent.coral;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Box sx={styles.container}>
      {/* Header Section */}
      <Box sx={styles.header}>
        <Box>
          <Typography sx={styles.title}>Loan Management</Typography>
          <Typography sx={styles.subtitle}>
            Apply for loans and track your repayments
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={styles.applyBtn}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Apply for Loan"}
        </Button>
      </Box>

      {/* Loan Application Form */}
      <Collapse in={showForm}>
        <Paper elevation={0} sx={styles.formPaper}>
          <Box sx={styles.formHeader}>
            <AccountBalanceIcon sx={styles.formIcon} />
            <Typography sx={styles.formTitle}>Loan Application</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Loan Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  sx={styles.textField}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>₦</Typography>,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Loan Type"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  sx={styles.textField}
                >
                  {loanTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} ({option.rate} interest)
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Repayment Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  sx={styles.textField}
                >
                  {durations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.calculatedBox}>
                  <Typography sx={styles.calculatedLabel}>
                    Estimated Monthly Payment
                  </Typography>
                  <Typography sx={styles.calculatedAmount}>
                    ₦{formData.amount && formData.duration
                      ? (
                          (parseFloat(formData.amount) * 1.05) /
                          parseInt(formData.duration)
                        ).toFixed(0)
                      : "0"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={styles.submitBtn}
            >
              Submit Application
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* Loan Applications List */}
      <Typography sx={styles.sectionTitle}>Your Loan Applications</Typography>

      <Box sx={styles.loanList}>
        {loanApplications.map((loan, index) => (
          <Card
            key={loan.id}
            elevation={0}
            sx={{
              ...styles.loanCard,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <CardContent sx={styles.loanContent}>
              {/* Loan Header */}
              <Box sx={styles.loanHeader}>
                <Box sx={styles.loanHeaderLeft}>
                  <Box
                    sx={{
                      ...styles.loanIconWrapper,
                      background: `${getStatusColor(loan.status)}20`,
                    }}
                  >
                    {getStatusIcon(loan.status)}
                  </Box>
                  <Box>
                    <Typography sx={styles.loanType}>{loan.type}</Typography>
                    <Typography sx={styles.loanDate}>{loan.date}</Typography>
                  </Box>
                </Box>

                <Box sx={styles.loanHeaderRight}>
                  <Typography sx={styles.loanAmount}>{loan.amount}</Typography>
                  <Chip
                    label={loan.status}
                    size="small"
                    sx={{
                      ...styles.statusChip,
                      background: `${getStatusColor(loan.status)}20`,
                      color: getStatusColor(loan.status),
                    }}
                  />
                </Box>
              </Box>

              {/* Loan Details */}
              <Box sx={styles.loanDetails}>
                <Box sx={styles.detailItem}>
                  <Typography sx={styles.detailLabel}>Duration</Typography>
                  <Typography sx={styles.detailValue}>
                    {loan.duration}
                  </Typography>
                </Box>
                <Box sx={styles.detailItem}>
                  <Typography sx={styles.detailLabel}>Interest</Typography>
                  <Typography sx={styles.detailValue}>{loan.interest}</Typography>
                </Box>
                {loan.totalRepayment && (
                  <Box sx={styles.detailItem}>
                    <Typography sx={styles.detailLabel}>
                      Total Repayment
                    </Typography>
                    <Typography sx={styles.detailValue}>
                      {loan.totalRepayment}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Repayment Tracker - Only for Approved Loans */}
              {loan.status === "Approved" && (
                <>
                  <Box sx={styles.progressSection}>
                    <Box sx={styles.progressHeader}>
                      <Typography sx={styles.progressLabel}>
                        Repayment Progress
                      </Typography>
                      <Typography sx={styles.progressPercent}>
                        {loan.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={loan.progress}
                      sx={{
                        ...styles.progressBar,
                        "& .MuiLinearProgress-bar": {
                          background: `linear-gradient(90deg, ${theme.palette.accent.gold}, ${theme.palette.accent.coral})`,
                        },
                      }}
                    />
                    <Box sx={styles.progressDetails}>
                      <Typography sx={styles.progressText}>
                        Repaid: {loan.repaid}
                      </Typography>
                      <Typography sx={styles.progressText}>
                        Remaining: {loan.remaining}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Expand/Collapse Button */}
                  <Button
                    fullWidth
                    sx={styles.expandBtn}
                    onClick={() =>
                      setExpandedLoan(expandedLoan === loan.id ? null : loan.id)
                    }
                    endIcon={
                      expandedLoan === loan.id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    }
                  >
                    {expandedLoan === loan.id
                      ? "Hide Details"
                      : "View Repayment Schedule"}
                  </Button>

                  {/* Repayment Schedule */}
                  <Collapse in={expandedLoan === loan.id}>
                    <Box sx={styles.scheduleBox}>
                      <Typography sx={styles.scheduleTitle}>
                        Next Payment
                      </Typography>
                      <Box sx={styles.nextPayment}>
                        <CalendarTodayIcon sx={styles.calendarIcon} />
                        <Box>
                          <Typography sx={styles.nextPaymentDate}>
                            {loan.nextPayment}
                          </Typography>
                          <Typography sx={styles.nextPaymentAmount}>
                            ₦8,750
                          </Typography>
                        </Box>
                      </Box>

                      <Button variant="contained" fullWidth sx={styles.payBtn}>
                        Make Payment
                      </Button>
                    </Box>
                  </Collapse>
                </>
              )}

              {/* Rejection Reason */}
              {loan.status === "Rejected" && (
                <Box sx={styles.rejectionBox}>
                  <Typography sx={styles.rejectionLabel}>Reason:</Typography>
                  <Typography sx={styles.rejectionReason}>
                    {loan.reason}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    p: { xs: 2, md: 3 },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    mb: 4,
  },

  title: {
    fontSize: { xs: "1.5rem", md: "2rem" },
    fontWeight: 800,
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: { xs: "0.85rem", md: "0.95rem" },
    color: "text.secondary",
    mt: 0.5,
  },

  applyBtn: {
    py: 1.5,
    px: 4,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    textTransform: "none",
    fontWeight: 700,
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
    },
  },

  formPaper: {
    p: { xs: 3, md: 4 },
    borderRadius: "24px",
    background: "background.paper",
    border: "2px solid",
    borderColor: "primary.main",
    mb: 4,
    animation: "fadeSlideDown 0.4s ease-out",
  },

  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 3,
  },

  formIcon: {
    fontSize: "2rem",
    color: "primary.main",
  },

  formTitle: {
    fontSize: { xs: "1.2rem", md: "1.4rem" },
    fontWeight: 700,
    color: "text.primary",
  },

  form: {
    mt: 3,
  },

  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  },

  calculatedBox: {
    p: 2,
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
    border: "1px solid",
    borderColor: "primary.main",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  calculatedLabel: {
    fontSize: "0.85rem",
    color: "text.secondary",
    mb: 0.5,
  },

  calculatedAmount: {
    fontSize: { xs: "1.3rem", md: "1.5rem" },
    fontWeight: 700,
    color: "primary.main",
  },

  submitBtn: {
    mt: 3,
    py: 1.8,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
  },

  sectionTitle: {
    fontSize: { xs: "1.2rem", md: "1.4rem" },
    fontWeight: 700,
    color: "text.primary",
    mb: 3,
  },

  loanList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  loanCard: {
    background: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "20px",
    transition: "all 0.3s",
    animation: "fadeSlideUp 0.4s ease-out backwards",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    },
  },

  loanContent: {
    p: { xs: 2.5, md: 3 },
    "&:last-child": {
      pb: { xs: 2.5, md: 3 },
    },
  },

  loanHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    flexWrap: "wrap",
    gap: 2,
  },

  loanHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  loanIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loanType: {
    fontSize: { xs: "1rem", md: "1.1rem" },
    fontWeight: 700,
    color: "text.primary",
  },

  loanDate: {
    fontSize: "0.8rem",
    color: "text.secondary",
    mt: 0.5,
  },

  loanHeaderRight: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 0.5,
  },

  loanAmount: {
    fontSize: { xs: "1.3rem", md: "1.5rem" },
    fontWeight: 800,
    color: "text.primary",
  },

  statusChip: {
    fontWeight: 700,
    fontSize: "0.75rem",
    height: "24px",
  },

  loanDetails: {
    display: "flex",
    gap: 3,
    mb: 3,
    flexWrap: "wrap",
  },

  detailItem: {
    flex: "1 1 auto",
    minWidth: "100px",
  },

  detailLabel: {
    fontSize: "0.8rem",
    color: "text.secondary",
    mb: 0.5,
  },

  detailValue: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "text.primary",
  },

  progressSection: {
    mb: 2,
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  },

  progressLabel: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "text.primary",
  },

  progressPercent: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "primary.main",
  },

  progressBar: {
    height: 8,
    borderRadius: "10px",
    backgroundColor: "action.hover",
  },

  progressDetails: {
    display: "flex",
    justifyContent: "space-between",
    mt: 1,
  },

  progressText: {
    fontSize: "0.8rem",
    color: "text.secondary",
  },

  expandBtn: {
    mt: 2,
    textTransform: "none",
    fontWeight: 600,
    color: "primary.main",
  },

  scheduleBox: {
    mt: 2,
    p: 2,
    borderRadius: "12px",
    background: "action.hover",
  },

  scheduleTitle: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "text.secondary",
    mb: 2,
  },

  nextPayment: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },

  calendarIcon: {
    fontSize: "1.5rem",
    color: "primary.main",
  },

  nextPaymentDate: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "text.primary",
  },

  nextPaymentAmount: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "primary.main",
    mt: 0.5,
  },

  payBtn: {
    py: 1.5,
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    textTransform: "none",
    fontWeight: 700,
  },

  rejectionBox: {
    mt: 2,
    p: 2,
    borderRadius: "12px",
    background: "rgba(255, 107, 107, 0.1)",
    border: "1px solid rgba(255, 107, 107, 0.3)",
  },

  rejectionLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "text.secondary",
    mb: 0.5,
  },

  rejectionReason: {
    fontSize: "0.9rem",
    color: "error.main",
  },

  "@keyframes fadeSlideUp": {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },

  "@keyframes fadeSlideDown": {
    from: { opacity: 0, transform: "translateY(-30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export default LoanSection;
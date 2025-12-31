import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Skeleton,
    Grid,
    Card,
    CardContent,
    Fade,
} from "@mui/material";
import {
    AccountBalanceWallet,
    TrendingUp,
    Timeline,
    Paid,
} from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import { styles } from "./styles";

const Overview = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        walletBalance: 0,
        totalInvested: 0,
        activeInvestments: 0,
        totalReturns: 0,
    });

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {
            setLoading(true);
            try {
                const [{ data: walletData }, { data: investmentsData }] =
                    await Promise.all([
                        supabase
                            .from("wallets")
                            .select("balance")
                            .eq("user_id", user.id)
                            .single(),
                        supabase
                            .from("investments")
                            .select("amount, roi_amount, status")
                            .eq("user_id", user.id),
                    ]);

                const totalInvested = investmentsData?.reduce(
                    (sum, inv) => sum + (inv.amount || 0),
                    0
                );

                const totalReturns = investmentsData?.reduce(
                    (sum, inv) => sum + (inv.roi_amount || 0),
                    0
                );

                const activeInvestments =
                    investmentsData?.filter((inv) => inv.status === "active").length;

                setStats({
                    walletBalance: walletData?.balance || 0,
                    totalInvested,
                    totalReturns,
                    activeInvestments,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    const cards = [
        {
            title: "Wallet Balance",
            value: `₦${stats.walletBalance.toLocaleString()}`,
            icon: AccountBalanceWallet,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            bgPattern: "rgba(102, 126, 234, 0.1)",
        },
        {
            title: "Total Invested",
            value: `₦${stats.totalInvested.toLocaleString()}`,
            icon: TrendingUp,
            gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            bgPattern: "rgba(16, 185, 129, 0.1)",
        },
        {
            title: "Active Investments",
            value: stats.activeInvestments,
            icon: Timeline,
            gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            bgPattern: "rgba(245, 158, 11, 0.1)",
        },
        {
            title: "Total Returns",
            value: `₦${stats.totalReturns.toLocaleString()}`,
            icon: Paid,
            gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            bgPattern: "rgba(139, 92, 246, 0.1)",
        },
    ];

    const SkeletonCard = () => (
        <Card sx={styles.skeletonCard}>
            <CardContent sx={styles.skeletonCardContent}>
                <Box sx={styles.skeletonHeader}>
                    <Skeleton variant="circular" width={72} height={72} />
                </Box>
                <Box sx={styles.skeletonBody}>
                    <Skeleton variant="text" width="70%" height={32} />
                    <Skeleton variant="text" width="50%" height={56} sx={{ mt: 2 }} />
                </Box>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <Box sx={styles.pageContainer}>
                <Container maxWidth="lg">
                    <Box sx={styles.header}>
                        <Skeleton variant="text" width={200} height={48} />
                        <Skeleton variant="text" width={300} height={28} sx={{ mt: 1 }} />
                    </Box>
                    <Grid container spacing={4} sx={styles.gridContainer}>
                        {[1, 2, 3, 4].map((i) => (
                            <Grid item xs={12} sm={6} md={6} key={i}>
                                <SkeletonCard />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
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
                            Dashboard Overview
                        </Typography>
                        <Typography variant="body1" sx={styles.pageSubtitle}>
                            Track your investments and wallet balance
                        </Typography>
                    </Box>
                </Fade>

                {/* Stats Cards */}
                <Grid container spacing={4} sx={styles.gridContainer}>
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Grid item xs={12} sm={6} md={6} key={card.title}>
                                <Fade in timeout={400 + index * 150}>
                                    <Card sx={styles.statCard}>
                                        <Box sx={styles.cardPattern(card.bgPattern)} />
                                        <CardContent sx={styles.cardContent}>
                                            {/* Icon Section */}
                                            <Box sx={styles.iconSection}>
                                                <Box sx={styles.iconWrapper(card.gradient)}>
                                                    <Icon sx={styles.icon} />
                                                </Box>
                                            </Box>

                                            {/* Content Section */}
                                            <Box sx={styles.contentSection}>
                                                <Typography variant="body2" sx={styles.cardLabel}>
                                                    {card.title}
                                                </Typography>
                                                <Typography variant="h3" sx={styles.cardValue}>
                                                    {card.value}
                                                </Typography>
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

export default Overview;
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Fade,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Notifications,
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle,
  Close,
} from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import { styles } from "./styles";

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setNotifications(data || []);
      setLoading(false);
    };

    fetchNotifications();
  }, [user]);

  const getTypeConfig = (type) => {
    const configs = {
      funding: {
        label: "Funding",
        color: "#10b981",
        bgColor: "#d1fae5",
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        icon: AccountBalanceWallet,
      },
      withdrawal: {
        label: "Withdrawal",
        color: "#f59e0b",
        bgColor: "#fef3c7",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        icon: TrendingDown,
      },
      investment: {
        label: "Investment",
        color: "#667eea",
        bgColor: "#e0e7ff",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        icon: TrendingUp,
      },
      system: {
        label: "System",
        color: "#64748b",
        bgColor: "#f1f5f9",
        gradient: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        icon: Info,
      },
    };
    return configs[type] || configs.system;
  };

  const handleDismiss = async (notificationId) => {
    // Optional: Mark as read or delete
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const NotificationSkeleton = () => (
    <Card sx={styles.notificationCard}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={28} />
            <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="30%" height={18} sx={{ mt: 1 }} />
          </Box>
          <Skeleton variant="rounded" width={80} height={32} />
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={styles.pageContainer}>
        <Container maxWidth="md">
          <Box sx={styles.header}>
            <Skeleton variant="text" width={250} height={60} />
            <Skeleton variant="text" width={350} height={30} sx={{ mt: 1 }} />
          </Box>
          <Box>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <NotificationSkeleton />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="md">
        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={styles.header}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <Box sx={styles.headerIconWrapper}>
                <Notifications sx={{ fontSize: 36, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h3" sx={styles.pageTitle}>
                  Notifications
                </Typography>
                <Typography variant="body1" sx={styles.pageSubtitle}>
                  Stay updated with your account activity
                </Typography>
              </Box>
            </Box>
            {notifications.length > 0 && (
              <Chip
                label={`${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`}
                sx={styles.countChip}
              />
            )}
          </Box>
        </Fade>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <Fade in timeout={800}>
            <Box sx={styles.emptyState}>
              <Box sx={styles.emptyIconWrapper}>
                <Notifications sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <Typography variant="h5" sx={styles.emptyTitle}>
                No Notifications
              </Typography>
              <Typography variant="body1" sx={styles.emptySubtitle}>
                You're all caught up! New notifications will appear here.
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Box sx={styles.notificationsList}>
            {notifications.map((notification, index) => {
              const typeConfig = getTypeConfig(notification.type);
              const TypeIcon = typeConfig.icon;

              return (
                <Fade in timeout={400 + index * 100} key={notification.id}>
                  <Card sx={styles.notificationCard}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={styles.notificationContent}>
                        {/* Icon */}
                        <Avatar sx={styles.notificationIcon(typeConfig.gradient)}>
                          <TypeIcon sx={{ fontSize: 28 }} />
                        </Avatar>

                        {/* Content */}
                        <Box sx={{ flex: 1 }}>
                          <Box sx={styles.notificationHeader}>
                            <Typography variant="h6" sx={styles.notificationTitle}>
                              {notification.title}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleDismiss(notification.id)}
                              sx={styles.dismissButton}
                            >
                              <Close sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Box>

                          <Typography variant="body2" sx={styles.notificationMessage}>
                            {notification.message}
                          </Typography>

                          <Box sx={styles.notificationFooter}>
                            <Typography variant="caption" sx={styles.notificationTime}>
                              {new Date(notification.created_at).toLocaleString()}
                            </Typography>
                            <Chip
                              label={typeConfig.label}
                              size="small"
                              sx={styles.typeChip(typeConfig)}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NotificationsPage;
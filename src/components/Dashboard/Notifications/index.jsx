import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";

const typeColor = {
  funding: "success",
  withdrawal: "warning",
  investment: "info",
  system: "default",
};

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

  if (loading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 10, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Notifications
      </Typography>

      {notifications.length === 0 && (
        <Typography color="text.secondary">
          No notifications yet.
        </Typography>
      )}

      {notifications.map((n) => (
        <Paper
          key={n.id}
          sx={{
            p: 2.5,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: "4px solid #1976d2",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              {n.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {n.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(n.created_at).toLocaleString()}
            </Typography>
          </Box>

          <Chip
            label={n.type.toUpperCase()}
            color={typeColor[n.type]}
            size="small"
          />
        </Paper>
      ))}
    </Box>
  );
};

export default NotificationsPage;

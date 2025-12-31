import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import { List, ListItem, ListItemText, Button, Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import toast from "react-hot-toast";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("admin_notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return toast.error("Failed to fetch notifications");

    setNotifications(data);
    setUnreadCount(data.filter(n => !n.is_read).length);
  };

  const markAsRead = async (id) => {
    await supabase.from("admin_notifications").update({ is_read: true }).eq("id", id);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel("public:admin_notifications")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_notifications" }, payload => {
        setNotifications(prev => [payload.new, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div>
      <IconButton>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <List>
        {notifications.map((n) => (
          <ListItem key={n.id} divider>
            <ListItemText
              primary={n.message}
              secondary={new Date(n.created_at).toLocaleString()}
            />
            {!n.is_read && (
              <Button onClick={() => markAsRead(n.id)} variant="contained">
                Mark as read
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdminNotifications;

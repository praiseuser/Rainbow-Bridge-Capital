import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Stack,
  Container,
  Skeleton,
  Fade,
  alpha,
} from "@mui/material";
import {
  Block,
  CheckCircle,
  Email,
  AdminPanelSettings,
  Search,
} from "@mui/icons-material";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_all_users');
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleBlock = async (user) => {
    try {
      setProcessingId(user.id);
      const { error } = await supabase.rpc('admin_toggle_user_block', {
        user_id: user.id,
        new_blocked_status: !user.is_blocked
      });
      if (error) throw error;
      toast.success(user.is_blocked ? "User unblocked" : "User blocked");
      fetchUsers();
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  const UserCardSkeleton = () => (
    <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={56} height={56} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={28} />
            <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
          </Box>
          <Skeleton variant="rounded" width={100} height={36} />
        </Stack>
      </CardContent>
    </Card>
  );

  const getInitials = (name, email) => {
    if (name && name !== "N/A") return name.split(' ').map(n => n[0]).join('').slice(0, 2);
    return email?.[0] || '?';
  };

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return `hsl(${hash % 360}, 65%, 55%)`;
  };

  const statsCards = [
    { label: "Total Users", value: users.length, bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { label: "Blocked", value: users.filter(u => u.is_blocked).length, bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { label: "Admins", value: users.filter(u => u.is_admin).length, bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  ];

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h4" fontWeight={700} sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}>
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage and monitor all registered users
        </Typography>

        {/* Stats */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
          {statsCards.map((stat, i) => (
            <Card key={i} sx={{ flex: 1, background: stat.bg, color: "white", borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>
                  {loading ? <Skeleton width={60} sx={{ bgcolor: alpha("#fff", 0.3) }} /> : stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{stat.label}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Users List */}
        {loading ? (
          [1, 2, 3, 4].map(i => <UserCardSkeleton key={i} />)
        ) : users.length === 0 ? (
          <Card sx={{ textAlign: "center", py: 8, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <Search sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">No users found</Typography>
          </Card>
        ) : (
          users.map((user, i) => (
            <Fade in timeout={300} style={{ transitionDelay: `${i * 50}ms` }} key={user.id}>
              <Card sx={{
                mb: 2,
                borderRadius: 3,
                background: user.is_blocked 
                  ? "linear-gradient(135deg, #ffebee 0%, #fff 100%)"
                  : "linear-gradient(135deg, #f3e7ff 0%, #fff 100%)",
                border: "1px solid",
                borderColor: user.is_blocked ? alpha("#f44336", 0.3) : alpha("#667eea", 0.3),
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: user.is_blocked
                    ? "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)"
                    : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                },
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: user.is_blocked ? "0 12px 40px rgba(244,67,54,0.2)" : "0 12px 40px rgba(102,126,234,0.2)",
                  "&::before": { opacity: 1 },
                },
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                    <Avatar sx={{
                      width: 56,
                      height: 56,
                      bgcolor: stringToColor(user.email),
                      fontSize: 20,
                      fontWeight: 600,
                      boxShadow: 2,
                    }}>
                      {getInitials(user.full_name, user.email)}
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography variant="h6" fontWeight={600} noWrap>
                          {user.full_name || "Unnamed User"}
                        </Typography>
                        {user.is_admin && (
                          <Chip icon={<AdminPanelSettings />} label="Admin" size="small" color="secondary" sx={{ fontWeight: 600, height: 24 }} />
                        )}
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Email sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {user.email}
                          </Typography>
                        </Stack>
                        <Chip
                          icon={user.is_blocked ? <Block /> : <CheckCircle />}
                          label={user.is_blocked ? "Blocked" : "Active"}
                          size="small"
                          color={user.is_blocked ? "error" : "success"}
                          sx={{ fontWeight: 600, height: 24 }}
                        />
                      </Stack>
                    </Box>

                    <Button
                      variant={user.is_blocked ? "contained" : "outlined"}
                      color={user.is_blocked ? "success" : "error"}
                      startIcon={user.is_blocked ? <CheckCircle /> : <Block />}
                      onClick={() => toggleBlock(user)}
                      disabled={processingId === user.id}
                      sx={{ minWidth: 120, fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                    >
                      {processingId === user.id ? "Processing..." : user.is_blocked ? "Unblock" : "Block"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Fade>
          ))
        )}
      </Container>
    </Box>
  );
};

export default AdminUsers;
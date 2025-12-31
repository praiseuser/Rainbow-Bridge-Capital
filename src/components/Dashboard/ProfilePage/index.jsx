import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Load user info
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("full_name, email, user_type")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setName(data.full_name || "");
        setEmail(data.email || "");
        setUserType(data.user_type || "User");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      setLoadingProfile(true);
      const { error } = await supabase
        .from("users")
        .update({
          full_name: name,
          email,
        })
        .eq("id", user.id);

      if (error) throw error;

      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to update profile", severity: "error" });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setSnackbar({ open: true, message: "Fill all password fields", severity: "error" });
      return;
    }

    try {
      setLoadingPassword(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setSnackbar({ open: true, message: "Password changed successfully!", severity: "success" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to change password", severity: "error" });
    } finally {
      setLoadingPassword(false);
    }
  };

  if (!user) return <Typography>Please login to view profile</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 3 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Profile Settings</Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
        <TextField
          label="Full Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleProfileUpdate}
          disabled={loadingProfile}
        >
          {loadingProfile ? "Updating..." : "Update Profile"}
        </Button>
      </Paper>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
        <TextField
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleChangePassword}
          disabled={loadingPassword}
        >
          {loadingPassword ? "Changing..." : "Change Password"}
        </Button>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Account Details</Typography>
        <Typography>User ID: {user.id}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>User Type: {userType}</Typography>
        <Typography>Registered At: {new Date(user.created_at).toLocaleString()}</Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;

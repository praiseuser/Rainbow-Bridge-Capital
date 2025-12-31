import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Switch,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Skeleton,
  Fade,
  InputAdornment,
  Grid,
  Chip,
} from "@mui/material";
import {
  Settings,
  AccountBalance,
  TrendingUp,
  Lock,
  AttachMoney,
  Build,
  Save,
  CheckCircle,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import supabase from "../../../supabase";
import { styles } from "./styles";

const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("platform_settings")
      .select("*");

    if (error) {
      toast.error("Failed to load settings");
    } else {
      const formatted = {};
      data.forEach((s) => {
        formatted[s.key] = s.value;
      });
      setSettings(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);

      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: String(value),
        updated_at: new Date(),
      }));

      const { error } = await supabase
        .from("platform_settings")
        .upsert(updates, { onConflict: "key" });

      if (error) throw error;

      toast.success("Settings updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const SettingSkeleton = () => (
    <Card sx={styles.settingCard}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Skeleton variant="circular" width={48} height={48} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={28} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>
        </Box>
        <Skeleton variant="rounded" width="100%" height={56} />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={styles.pageContainer}>
        <Container maxWidth="lg">
          <Box sx={styles.headerSection}>
            <Skeleton variant="text" width={300} height={60} />
            <Skeleton variant="text" width={400} height={30} sx={{ mt: 1 }} />
          </Box>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} md={6} key={i}>
                <SettingSkeleton />
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
        <Fade in timeout={800}>
          <Box sx={styles.headerSection}>
            <Box sx={styles.headerContent}>
              <Box sx={styles.iconWrapper}>
                <Settings sx={{ fontSize: 36, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h3" sx={styles.pageTitle}>
                  Platform Settings
                </Typography>
                <Typography variant="body1" sx={styles.pageSubtitle}>
                  Configure and manage your platform settings
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<CheckCircle />}
              label="Admin Control"
              sx={styles.adminBadge}
            />
          </Box>
        </Fade>

        {/* Settings Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Withdrawals Toggle */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={400}>
              <Card sx={styles.settingCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.settingHeader}>
                    <Box sx={styles.settingIconBox('#10b981')}>
                      <AccountBalance sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={styles.settingTitle}>
                        Withdrawals
                      </Typography>
                      <Typography variant="body2" sx={styles.settingDescription}>
                        Enable or disable user withdrawals
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.withdrawals_enabled === "true"}
                      onChange={(e) =>
                        updateSetting("withdrawals_enabled", String(e.target.checked))
                      }
                      sx={styles.customSwitch}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Investments Toggle */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={500}>
              <Card sx={styles.settingCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.settingHeader}>
                    <Box sx={styles.settingIconBox('#667eea')}>
                      <TrendingUp sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={styles.settingTitle}>
                        Investments
                      </Typography>
                      <Typography variant="body2" sx={styles.settingDescription}>
                        Enable or disable investment features
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.investments_enabled === "true"}
                      onChange={(e) =>
                        updateSetting("investments_enabled", String(e.target.checked))
                      }
                      sx={styles.customSwitch}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Maintenance Mode */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={600}>
              <Card sx={styles.settingCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.settingHeader}>
                    <Box sx={styles.settingIconBox('#f59e0b')}>
                      <Build sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={styles.settingTitle}>
                        Maintenance Mode
                      </Typography>
                      <Typography variant="body2" sx={styles.settingDescription}>
                        Put platform in maintenance mode
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.maintenance_mode === "true"}
                      onChange={(e) =>
                        updateSetting("maintenance_mode", String(e.target.checked))
                      }
                      sx={styles.customSwitch}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Minimum Deposit */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={700}>
              <Card sx={styles.settingCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.settingHeader}>
                    <Box sx={styles.settingIconBox('#8b5cf6')}>
                      <AttachMoney sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={styles.settingTitle}>
                        Minimum Deposit
                      </Typography>
                      <Typography variant="body2" sx={styles.settingDescription}>
                        Set minimum deposit amount
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    value={settings.min_deposit || ""}
                    onChange={(e) => updateSetting("min_deposit", e.target.value)}
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography sx={styles.currencySymbol}>₦</Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.inputField}
                  />
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Minimum Withdrawal */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Card sx={styles.settingCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.settingHeader}>
                    <Box sx={styles.settingIconBox('#ec4899')}>
                      <Lock sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={styles.settingTitle}>
                        Minimum Withdrawal
                      </Typography>
                      <Typography variant="body2" sx={styles.settingDescription}>
                        Set minimum withdrawal amount
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    value={settings.min_withdrawal || ""}
                    onChange={(e) => updateSetting("min_withdrawal", e.target.value)}
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography sx={styles.currencySymbol}>₦</Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.inputField}
                  />
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* ROI Percentage */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={900}>
              <Card sx={styles.settingCard}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={styles.settingHeader}>
                    <Box sx={styles.settingIconBox('#14b8a6')}>
                      <TrendingUp sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={styles.settingTitle}>
                        ROI Percentage
                      </Typography>
                      <Typography variant="body2" sx={styles.settingDescription}>
                        Default return on investment rate
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    value={settings.roi_percentage || ""}
                    onChange={(e) => updateSetting("roi_percentage", e.target.value)}
                    placeholder="0"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={styles.percentSymbol}>%</Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.inputField}
                  />
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Fade in timeout={1000}>
          <Box sx={styles.saveButtonContainer}>
            <Button
              variant="contained"
              size="large"
              onClick={saveSettings}
              disabled={saving}
              startIcon={<Save />}
              sx={styles.saveButton}
            >
              {saving ? "Saving Changes..." : "Save All Settings"}
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default AdminSettings;
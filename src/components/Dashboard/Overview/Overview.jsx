import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const DashboardHome = () => {
  const { membership } = useAuth();
  const navigate = useNavigate();

  const tierLabel = membership?.tier
    ? `Tier ${membership.tier}`
    : "No Tier Selected";

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Dashboard Overview
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Current Tier:</strong> {tierLabel}
          </Typography>

          {membership?.status === "active" && (
            <Typography sx={{ color: "green", mb: 2 }}>
              Status: Active
            </Typography>
          )}

          {membership?.status === "pending" && (
            <Typography sx={{ color: "orange", mb: 2 }}>
              Upgrade Pending Approval
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/tiers-upgrade")}
          >
            Upgrade Tier
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardHome;

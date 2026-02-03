import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

const DashboardHome = ({ setActiveSection }) => {
  const { membership } = useAuth();

  const tierLabel = membership?.tier
    ? `Tier ${membership.tier}`
    : "No Tier Selected";

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        gap: 2,
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
            <Typography sx={{ color: "green", mb: 2 }}>Status: Active</Typography>
          )}

          {membership?.status === "pending" && (
            <Typography sx={{ color: "orange", mb: 2 }}>
              Upgrade Pending Approval
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Activate Manager button triggers the section, no route */}
      <Button
        variant="outlined"
        onClick={() => setActiveSection("ActivateManager")}
        sx={{ mt: 1 }}
      >
        Activate Manager Account
      </Button>

      {membership?.tier < 3 && (
        <Typography sx={{ color: "red", mt: 1, fontSize: "0.9rem" }}>
          *Manager activation requires Tier 3 or higher
        </Typography>
      )}
    </Box>
  );
};

export default DashboardHome;

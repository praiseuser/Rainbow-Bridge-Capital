import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import ActivateManager from "../ActivateManager";

const DashboardHome = ({ membership }) => {
  const [openManagerModal, setOpenManagerModal] = useState(false);

  return (
    <Box sx={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, px: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Dashboard Overview
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Current Tier:</strong> {membership?.tier || "No Tier Selected"}
          </Typography>

          {membership?.status === "active" && (
            <Typography sx={{ color: "green", mb: 2 }}>Status: Active</Typography>
          )}
        </CardContent>
      </Card>

      {/* Activate Manager button triggers modal */}
      <Button variant="outlined" onClick={() => setOpenManagerModal(true)}>
        Activate Manager Account
      </Button>

      {membership?.tier < 3 && (
        <Typography sx={{ color: "red", mt: 1, fontSize: "0.9rem" }}>
          *Manager activation requires Tier 3 or higher
        </Typography>
      )}

      {/* Modal */}
      <ActivateManager open={openManagerModal} handleClose={() => setOpenManagerModal(false)} />
    </Box>
  );
};

export default DashboardHome;

import React from "react";
import { Box, Typography } from "@mui/material";

const Overview = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        Overview Page
      </Typography>
    </Box>
  );
};

export default Overview;

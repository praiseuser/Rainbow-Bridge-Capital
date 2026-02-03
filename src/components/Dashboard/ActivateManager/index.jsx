import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ActivateManager = () => {
  const { user, membership } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Safety checks
  if (!membership || membership.tier < 3) {
    return <Typography>You are not eligible to become a manager.</Typography>;
  }

  const handleActivate = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("managers")
        .upsert(
          {
            user_id: user.id,
            status: "active",
            star_level: 1,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      toast.success("Manager account activated 🎉");
      navigate("/manager/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to activate manager account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Become a Manager
      </Typography>

      <Typography mb={3}>
        As a Tier {membership.tier} user, you are eligible to manage members and earn commissions.
      </Typography>

      <Button
        variant="contained"
        onClick={handleActivate}
        disabled={loading}
      >
        {loading ? "Activating..." : "Activate Manager Account"}
      </Button>
    </Box>
  );
};

export default ActivateManager;

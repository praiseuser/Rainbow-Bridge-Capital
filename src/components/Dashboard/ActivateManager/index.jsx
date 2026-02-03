import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1f2a38",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  color: "white",
};

const ActivateManager = ({ open, handleClose }) => {
  const { user, membership, fetchMembership } = useAuth();
  const [loading, setLoading] = useState(false);

  // Tier check
  if (!membership) return <Typography>Loading...</Typography>;
  if (membership.tier < 3) {
    return (
      <Typography sx={{ color: "red" }}>
        You need to be Tier 3 or higher to activate as a manager.
      </Typography>
    );
  }

  const handleActivate = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Upsert manager record
      const { error } = await supabase
        .from("managers")
        .upsert(
          {
            user_id: user.id,
            status: "pending", // pending admin approval
            star_level: 1,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      toast.success("Manager activation requested! Awaiting admin approval.");

      // Refresh membership to reflect manager status if needed
      await fetchMembership(user.id);

      handleClose(); // close modal
    } catch (err) {
      console.error(err);
      toast.error("Failed to request manager activation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={style}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Become a Manager
          </Typography>
          <Typography mb={3}>
            As a Tier {membership.tier} user, you are eligible to manage members
            and earn commissions.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={handleActivate}
            disabled={loading}
          >
            {loading ? "Requesting..." : "Request Manager Activation"}
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ActivateManager;

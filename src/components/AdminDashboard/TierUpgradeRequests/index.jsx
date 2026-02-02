import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const TierUpgradeRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch all pending requests
  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("tier_requests")
      .select("*")
      .eq("status", "pending");
    if (!error) setRequests(data);
  };

  useEffect(() => {
    fetchRequests();

    // 🔹 Real-time subscription for any changes to tier_requests
    const subscription = supabase
      .from("tier_requests")
      .on("*", (payload) => {
        // Update table when a row changes
        fetchRequests();

        // Optional: notify admin
        if (payload.eventType === "UPDATE") {
          const { new: updated } = payload;
          toast.success(`User ${updated.user_id} request updated to ${updated.status}`);
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const handleApprove = async (req) => {
    try {
      const { error } = await supabase
        .from("tier_requests")
        .update({ status: "approved" })
        .eq("id", req.id);
      if (error) throw error;

      // Update user's membership immediately
      const { error: membershipError } = await supabase
        .from("memberships")
        .upsert({ user_id: req.user_id, tier: req.requested_tier, status: "active" }, { onConflict: "user_id" });
      if (membershipError) throw membershipError;

      toast.success(`Approved upgrade request for user ${req.user_id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve request");
    }
  };

  const handleReject = async (req) => {
    try {
      const { error } = await supabase
        .from("tier_requests")
        .update({ status: "rejected" })
        .eq("id", req.id);
      if (error) throw error;

      toast.error(`Rejected upgrade request for user ${req.user_id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Tier Upgrade Requests
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Current Tier</TableCell>
            <TableCell>Requested Tier</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.user_id}</TableCell>
              <TableCell>{req.current_tier}</TableCell>
              <TableCell>{req.requested_tier}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => handleApprove(req)}>
                  Approve
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleReject(req)}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TierUpgradeRequests;

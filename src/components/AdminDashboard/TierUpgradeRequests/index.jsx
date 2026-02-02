import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const TierUpgradeRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("tier_requests")
      .select("*")
      .eq("status", "pending");

    if (!error) setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (req) => {
    try {
      // 1️⃣ Approve request
      await supabase
        .from("tier_requests")
        .update({ status: "approved" })
        .eq("id", req.id);

      // 2️⃣ Update membership
      await supabase
        .from("memberships")
        .upsert(
          {
            user_id: req.user_id,
            tier: req.requested_tier,
            status: "active",
          },
          { onConflict: "user_id" }
        );

      toast.success("Tier upgrade approved");
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  const handleReject = async (req) => {
    try {
      await supabase
        .from("tier_requests")
        .update({ status: "rejected" })
        .eq("id", req.id);

      toast.error("Request rejected");
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Reject failed");
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
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => handleApprove(req)}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleReject(req)}
                >
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

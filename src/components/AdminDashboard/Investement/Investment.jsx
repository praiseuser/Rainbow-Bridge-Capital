import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const AdminInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("investments")
        .select(`
          id,
          amount,
          roi_amount,
          status,
          start_date,
          end_date,
          created_at,
          user:users(email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvestments(data);
    } catch (err) {
      console.error("Error fetching investments:", err);
      toast.error("Failed to load investments");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const updateStatus = async (investment, newStatus) => {
    try {
      setProcessingId(investment.id);

      // ✅ If marking completed, add ROI to user's wallet
      if (newStatus === "completed") {
        const { data: wallet, error: walletError } = await supabase
          .from("wallets")
          .select("*")
          .eq("user_id", investment.user_id)
          .single();

        if (walletError) throw walletError;

        const { error: walletUpdateError } = await supabase
          .from("wallets")
          .update({ balance: wallet.balance + investment.roi_amount })
          .eq("user_id", investment.user_id);

        if (walletUpdateError) throw walletUpdateError;
      }

      // 2️⃣ Update investment status
      const { error } = await supabase
        .from("investments")
        .update({ status: newStatus })
        .eq("id", investment.id);

      if (error) throw error;

      toast.success(
        newStatus === "completed"
          ? "Investment completed & ROI credited"
          : `Investment ${newStatus}`
      );
      fetchInvestments();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p>Loading investments...</p>;

  return (
    <div>
      <h2>Investment Monitoring</h2>

      {investments.length === 0 && <p>No investments found.</p>}

      {investments.map((inv) => (
        <div
          key={inv.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <p><strong>User:</strong> {inv.user?.email}</p>
          <p><strong>Amount:</strong> ${inv.amount}</p>
          <p><strong>ROI:</strong> ${inv.roi_amount}</p>
          <p><strong>Status:</strong> {inv.status}</p>
          <p><strong>Start:</strong> {inv.start_date}</p>
          <p><strong>End:</strong> {inv.end_date}</p>

          {inv.status === "pending" && (
            <>
              <Button
                variant="contained"
                onClick={() => updateStatus(inv, "active")}
                disabled={processingId === inv.id}
              >
                Approve
              </Button>

              <Button
                color="error"
                sx={{ ml: 1 }}
                onClick={() => updateStatus(inv, "rejected")}
                disabled={processingId === inv.id}
              >
                Reject
              </Button>
            </>
          )}

          {inv.status === "active" && (
            <Button
              color="success"
              sx={{ ml: 1 }}
              onClick={() => updateStatus(inv, "completed")}
              disabled={processingId === inv.id}
            >
              {processingId === inv.id ? "Processing..." : "Mark Completed"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminInvestments;

import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const AdminWallets = () => {
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [fundings, setFundings] = useState([]); // NEW
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // Fetch all users along with their wallets
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_all_users');
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
  };

  // Fetch all investments
  const fetchInvestments = async () => {
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
          user_id
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvestments(data);
    } catch (err) {
      console.error("Error fetching investments:", err);
      toast.error("Failed to load investments");
    }
  };

  // NEW: Fetch all wallet fundings
  const fetchFundings = async () => {
    try {
      const { data, error } = await supabase.rpc('get_all_wallet_fundings');
      if (error) throw error;
      setFundings(data);
    } catch (err) {
      console.error("Error fetching fundings:", err);
      toast.error("Failed to load wallet fundings");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchInvestments(), fetchFundings()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle user blocked status
  const toggleBlock = async (user) => {
    try {
      setProcessingId(user.id);
      const { error } = await supabase.rpc('admin_toggle_user_block', {
        user_id: user.id,
        new_blocked_status: !user.is_blocked
      });
      if (error) throw error;
      toast.success(user.is_blocked ? "User unblocked" : "User blocked");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  // Update investment status
  const updateInvestmentStatus = async (investment, newStatus) => {
    try {
      setProcessingId(investment.id);

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
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  // NEW: Update wallet funding status
  const updateFundingStatus = async (funding, newStatus) => {
    try {
      setProcessingId(funding.id);

      const { error } = await supabase.rpc('admin_update_wallet_funding', {
        funding_id: funding.id,
        new_status: newStatus
      });

      if (error) throw error;

      toast.success(
        newStatus === "approved"
          ? "Funding approved & wallet credited"
          : `Funding ${newStatus}`
      );
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div>
      {/* NEW: Wallet Fundings Section */}
      <h2>Wallet Funding Requests</h2>
      {fundings.length === 0 && <p>No funding requests found.</p>}
      {fundings.map((funding) => (
        <div
          key={funding.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            backgroundColor: funding.status === 'pending' ? '#fff3cd' : 'white'
          }}
        >
          <p><strong>User:</strong> {funding.user_email} ({funding.user_full_name})</p>
          <p><strong>Amount:</strong> ${funding.amount_usd}</p>
          <p><strong>Network:</strong> {funding.crypto_network}</p>
          <p><strong>Wallet Address:</strong> {funding.wallet_address}</p>
          <p><strong>TX Hash:</strong> {funding.tx_hash}</p>
          <p><strong>Status:</strong> {funding.status}</p>
          <p><strong>Date:</strong> {new Date(funding.created_at).toLocaleString()}</p>

          {funding.status === "pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => updateFundingStatus(funding, "approved")}
                disabled={processingId === funding.id}
              >
                {processingId === funding.id ? "Processing..." : "Approve"}
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
                onClick={() => updateFundingStatus(funding, "rejected")}
                disabled={processingId === funding.id}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ))}

      <h2>Users & Wallets</h2>
      {users.length === 0 && <p>No users found.</p>}
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Full Name:</strong> {user.full_name || "N/A"}</p>
          <p><strong>Wallet Balance:</strong> ${user.wallet_balance}</p>
          <p><strong>Status:</strong> {user.is_blocked ? "🔴 Blocked" : "🟢 Active"}</p>

          <Button
            variant="contained"
            color={user.is_blocked ? "success" : "error"}
            onClick={() => toggleBlock(user)}
            disabled={processingId === user.id}
          >
            {processingId === user.id
              ? "Processing..."
              : user.is_blocked
                ? "Unblock"
                : "Block"}
          </Button>
        </div>
      ))}

      <h2>Investments</h2>
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
          <p><strong>Amount:</strong> ${inv.amount}</p>
          <p><strong>ROI:</strong> ${inv.roi_amount}</p>
          <p><strong>Status:</strong> {inv.status}</p>
          <p><strong>Start:</strong> {inv.start_date}</p>
          <p><strong>End:</strong> {inv.end_date}</p>

          {inv.status === "pending" && (
            <>
              <Button
                variant="contained"
                onClick={() => updateInvestmentStatus(inv, "active")}
                disabled={processingId === inv.id}
              >
                Approve
              </Button>

              <Button
                color="error"
                sx={{ ml: 1 }}
                onClick={() => updateInvestmentStatus(inv, "rejected")}
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
              onClick={() => updateInvestmentStatus(inv, "completed")}
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

export default AdminWallets;
import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Use RPC function to bypass RLS
      const { data, error } = await supabase.rpc('get_all_users');

      if (error) throw error;
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (user) => {
    try {
      setProcessingId(user.id);

      // Use RPC function to update user
      const { error } = await supabase.rpc('admin_toggle_user_block', {
        user_id: user.id,
        new_blocked_status: !user.is_blocked
      });

      if (error) throw error;

      toast.success(
        user.is_blocked ? "User unblocked successfully" : "User blocked successfully"
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 && <p>No users found.</p>}
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Full Name:</strong> {user.full_name || "N/A"}</p>
            <p><strong>Status:</strong> {user.is_blocked ? "🔴 Blocked" : "🟢 Active"}</p>
            <p><strong>Admin:</strong> {user.is_admin ? "Yes" : "No"}</p>
          </div>
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
    </div>
  );
};

export default AdminUsers;
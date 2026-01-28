import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyStatusPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("verification")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      setStatus(data?.status || null);

      if (data?.status === "approved") {
        navigate("/dashboard"); // redirect when approved
      } else if (data?.status === "rejected") {
        navigate("/verify"); // redirect back to form if rejected
      }
    } catch (err) {
      console.error("Error fetching verification status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus(); // initial check

    const interval = setInterval(() => {
      fetchStatus(); // check every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // cleanup
  }, [user]);

  if (loading) return <div>Checking verification status...</div>;

  return <div>Your verification is {status || "pending"}...</div>;
};

export default VerifyStatusPage;

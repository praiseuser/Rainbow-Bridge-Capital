import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TierUpgradePage = () => {
  const { user, membership, fetchMembership } = useAuth();
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await supabase
        .from("tier_requests")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data?.status === "approved") {
        await fetchMembership(user.id);
        toast.success("Tier upgrade approved 🎉");
        navigate("/dashboard");
      }

      setChecking(false);
    };

    if (user) checkStatus();
  }, [user]);

  if (checking) return <p>Checking upgrade status...</p>;

  return <p>Your upgrade request is pending admin approval.</p>;
};

export default TierUpgradePage;

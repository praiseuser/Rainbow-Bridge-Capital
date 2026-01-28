import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyStatusPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [verification, setVerification] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchVerification = async () => {
      const { data, error } = await supabase
        .from("verification")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      const getPublicUrl = (path) =>
        path
          ? supabase.storage
            .from("verifications")
            .getPublicUrl(path).data.publicUrl
          : null;

      const updated = {
        ...data,
        selfie_url: getPublicUrl(data.selfie_path),
        id_url: getPublicUrl(data.id_path),
        fullbody_url: getPublicUrl(data.fullbody_path),
      };

      setVerification(updated);

      // 🔥 AUTO REDIRECT WHEN APPROVED
      if (updated.status === "approved") {
        navigate("/tiers", { replace: true });
      }
    };

    // first fetch
    fetchVerification();

    // 🔁 poll every 3 seconds
    const interval = setInterval(fetchVerification, 3000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  if (!verification) return <p>Checking verification status...</p>;

  return (
    <div>
      <h2>Verification Status: {verification.status}</h2>

      <p>
        {verification.status === "pending" &&
          "Your verification is being reviewed. Please wait..."}
      </p>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        {verification.selfie_url && (
          <img src={verification.selfie_url} alt="Selfie" width={150} />
        )}
        {verification.id_url && (
          <img src={verification.id_url} alt="ID" width={150} />
        )}
        {verification.fullbody_url && (
          <img src={verification.fullbody_url} alt="Full Body" width={150} />
        )}
      </div>
    </div>
  );
};

export default VerifyStatusPage;

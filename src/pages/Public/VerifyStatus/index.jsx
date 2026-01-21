import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";

const VerifyStatusPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;

      if (!userId) {
        navigate("/login");
        return;
      }

      const { data: verification, error } = await supabase
        .from("verification")
        .select("status")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setStatus(verification.status);

      if (verification.status === "approved") {
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1500);
      }
    };

    fetchStatus();
  }, [navigate]);

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>Verification Status</h1>

      {status === "loading" && <p>Checking status...</p>}
      {status === "pending" && <p>Your documents are under review.</p>}
      {status === "approved" && (
        <p>Congratulations! Your account is verified ✅</p>
      )}
      {status === "rejected" && (
        <p>Verification rejected. Please resubmit your documents.</p>
      )}
    </div>
  );
};

export default VerifyStatusPage;

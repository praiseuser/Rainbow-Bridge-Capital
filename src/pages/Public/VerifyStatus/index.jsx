import { useEffect, useState } from "react";
import supabase from "../../../supabase";

const VerifyStatusPage = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.auth.getUser();
      const userId = data.user.id;

      const { data: verification } = await supabase
        .from("verification")
        .select("status")
        .eq("user_id", userId)
        .single();

      setStatus(verification?.status || "not_verified");
    };
    fetchStatus();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: 50 }}>
      <h1>Verification Status</h1>
      {status === "pending" && <p>Your documents are under review.</p>}
      {status === "approved" && <p>Congratulations! Your account is verified ✅</p>}
      {status === "rejected" && <p>Verification rejected. Please resubmit.</p>}
      {status === "not_verified" && <p>Please submit your documents.</p>}
    </div>
  );
};

export default VerifyStatusPage;

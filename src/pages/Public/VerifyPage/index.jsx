import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selfie, setSelfie] = useState(null);
  const [idDoc, setIdDoc] = useState(null);
  const [fullBody, setFullBody] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);

  // Check verification status
  const fetchVerificationStatus = async () => {
    if (!user) return;
    setStatusLoading(true);
    try {
      const { data, error } = await supabase
        .from("verification")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error; // ignore no rows

      if (data?.status === "approved") {
        navigate("/dashboard"); // already approved → go to dashboard
      } else if (data?.status === "pending") {
        navigate("/verify/status"); // pending → go to status page
      }
    } catch (err) {
      console.error("Error fetching verification status:", err);
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationStatus();
  }, [user]);

  const handleSubmit = async () => {
    if (!selfie || !idDoc || !fullBody) {
      return toast.error("Please upload all files");
    }

    setLoading(true);
    try {
      const uploadFile = async (file, folder) => {
        const filePath = `${folder}/${user.id}_${Date.now()}_${file.name}`;
        const { error } = await supabase.storage.from("verifications").upload(filePath, file, { upsert: true });
        if (error) throw error;
        return filePath;
      };

      const selfiePath = await uploadFile(selfie, "selfies");
      const idPath = await uploadFile(idDoc, "ids");
      const fullBodyPath = await uploadFile(fullBody, "fullbody");

      const { error } = await supabase.from("verification").insert([
        {
          user_id: user.id,
          selfie_path: selfiePath,
          id_path: idPath,
          fullbody_path: fullBodyPath,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("Verification submitted successfully!");
      fetchVerificationStatus(); // check immediately and redirect
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit verification");
    } finally {
      setLoading(false);
    }
  };

  if (statusLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Submit Verification</h2>

      <div>
        <label>Selfie:</label>
        <input type="file" onChange={(e) => setSelfie(e.target.files[0])} />
      </div>

      <div>
        <label>ID Document:</label>
        <input type="file" onChange={(e) => setIdDoc(e.target.files[0])} />
      </div>

      <div>
        <label>Full Body Photo:</label>
        <input type="file" onChange={(e) => setFullBody(e.target.files[0])} />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Verification"}
      </button>
    </div>
  );
};

export default VerifyPage;

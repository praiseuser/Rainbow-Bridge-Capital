import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";

const VerifyStatusPage = () => {
  const { user } = useAuth();
  const [verification, setVerification] = useState(null);

  useEffect(() => {
    const fetchVerification = async () => {
      const { data, error } = await supabase
        .from("verification")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) return console.error(error);

      // Get public URLs
      const getPublicUrl = (path) => path ? supabase.storage.from("verifications").getPublicUrl(path).data.publicUrl : null;

      setVerification({
        ...data,
        selfie_url: getPublicUrl(data.selfie_path),
        id_url: getPublicUrl(data.id_path),
        fullbody_url: getPublicUrl(data.fullbody_path),
      });
    };

    fetchVerification();
  }, [user.id]);

  if (!verification) return <p>Loading verification...</p>;

  return (
    <div>
      <h2>Verification Status: {verification.status}</h2>

      <div>
        {verification.selfie_url && <img src={verification.selfie_url} alt="Selfie" width={150} />}
        {verification.id_url && <img src={verification.id_url} alt="ID Document" width={150} />}
        {verification.fullbody_url && <img src={verification.fullbody_url} alt="Full Body" width={150} />}
      </div>
    </div>
  );
};

export default VerifyStatusPage;

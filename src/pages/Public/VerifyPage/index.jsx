import React, { useState } from "react";
import supabase from "../../../supabase";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const VerifyPage = () => {
  const { user } = useAuth();
  const [selfie, setSelfie] = useState(null);
  const [idDoc, setIdDoc] = useState(null);
  const [fullBody, setFullBody] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selfie || !idDoc || !fullBody) {
      return toast.error("Please upload all files");
    }

    setLoading(true);
    try {
      const bucket = "verifications"; // your Supabase bucket name

      // Helper to upload file and get path
      const uploadFile = async (file) => {
        const fileName = `${user.id}_${file.name}`;
        const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
          upsert: true,
        });
        if (error) throw error;
        return fileName; // return the path
      };

      const selfiePath = await uploadFile(selfie);
      const idPath = await uploadFile(idDoc);
      const fullBodyPath = await uploadFile(fullBody);

      // Insert verification record
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit verification");
    } finally {
      setLoading(false);
    }
  };

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

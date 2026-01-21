import React, { useState } from "react";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

const VerifyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selfieFile, setSelfieFile] = useState(null);
  const [fullbodyFile, setFullbodyFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!selfieFile || !fullbodyFile || !idFile) {
      return alert("Please select all files before submitting!");
    }

    setLoading(true);

    try {
      // Upload each file to Supabase Storage
      const selfiePath = `selfies/${user.id}_${selfieFile.name}`;
      const fullbodyPath = `fullbody/${user.id}_${fullbodyFile.name}`;
      const idPath = `ids/${user.id}_${idFile.name}`;

      await supabase.storage.from("selfies").upload(selfiePath, selfieFile);
      await supabase.storage.from("fullbody").upload(fullbodyPath, fullbodyFile);
      await supabase.storage.from("ids").upload(idPath, idFile);

      // Update verification table
      await supabase
        .from("verification")
        .update({
          selfie_path: selfiePath,
          fullbody_path: fullbodyPath,
          id_path: idPath,
          status: "pending",
        })
        .eq("user_id", user.id);

      alert("Documents uploaded successfully! Awaiting approval.");
      navigate("/verify/status"); // go to status page

    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 50, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <h1>Upload Verification Documents</h1>
      <p>Please upload the following documents to verify your account:</p>

      <div style={{ margin: "20px 0" }}>
        <label>Selfie: </label>
        <input type="file" onChange={(e) => setSelfieFile(e.target.files[0])} />
      </div>

      <div style={{ margin: "20px 0" }}>
        <label>Full Body Photo: </label>
        <input type="file" onChange={(e) => setFullbodyFile(e.target.files[0])} />
      </div>

      <div style={{ margin: "20px 0" }}>
        <label>ID Document: </label>
        <input type="file" onChange={(e) => setIdFile(e.target.files[0])} />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? "Uploading..." : "Submit Documents"}
      </Button>
    </div>
  );
};

export default VerifyPage;

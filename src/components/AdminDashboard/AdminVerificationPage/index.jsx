import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import supabase from "../../../supabase";

const AdminVerificationPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all verification submissions
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("verification")
                .select(`
          id,
          user_id,
          status,
          selfie_path,
          id_path,
          fullbody_path,
          profiles(email)
        `)
                .order("created_at", { ascending: false });

            if (error) throw error;

            // Map paths to public URLs
            const submissionsWithUrls = data.map((sub) => ({
                ...sub,
                selfie_url: sub.selfie_path ? supabase.storage.from("verifications").getPublicUrl(sub.selfie_path).data.publicUrl : null,
                id_url: sub.id_path ? supabase.storage.from("verifications").getPublicUrl(sub.id_path).data.publicUrl : null,
                fullbody_url: sub.fullbody_path ? supabase.storage.from("verifications").getPublicUrl(sub.fullbody_path).data.publicUrl : null,
            }));

            setSubmissions(submissionsWithUrls);
        } catch (err) {
            console.error("Error fetching submissions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // Approve / Reject handler
    const handleUpdateStatus = async (id, status) => {
        try {
            const { error } = await supabase
                .from("verification")
                .update({ status })
                .eq("id", id);

            if (error) throw error;
            fetchSubmissions(); // refresh list
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#0a1f44", p: 3 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ color: "#fff", mb: 4 }}>
                    Admin Verification Review Panel
                </Typography>

                {loading ? (
                    <Typography sx={{ color: "#fff" }}>Loading submissions...</Typography>
                ) : submissions.length === 0 ? (
                    <Typography sx={{ color: "#fff" }}>No submissions found.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {submissions.map((sub) => (
                            <Grid item xs={12} md={6} key={sub.id}>
                                <Card sx={{ backgroundColor: "#1f2a38" }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: "#fff" }}>
                                            {sub.profiles?.email || "Unknown User"}
                                        </Typography>
                                        <Typography sx={{ color: "#ccc", mb: 2 }}>
                                            Status: {sub.status}
                                        </Typography>

                                        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                                            {sub.selfie_url && <img src={sub.selfie_url} alt="Selfie" width={100} />}
                                            {sub.id_url && <img src={sub.id_url} alt="ID Document" width={100} />}
                                            {sub.fullbody_url && <img src={sub.fullbody_url} alt="Full Body" width={100} />}
                                        </Box>

                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleUpdateStatus(sub.id, "approved")}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleUpdateStatus(sub.id, "rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default AdminVerificationPage;

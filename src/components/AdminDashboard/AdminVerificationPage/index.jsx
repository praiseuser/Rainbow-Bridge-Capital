import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import supabase from "../../../supabase";

const AdminVerificationPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            // 1️⃣ Fetch all verification rows
            const { data, error } = await supabase
                .from("verification")
                .select("*") // no join yet, we'll fetch users separately
                .order("created_at", { ascending: false });

            if (error) throw error;

            // 2️⃣ Map each submission to include public URLs for images
            const submissionsWithUrls = await Promise.all(
                data.map(async (sub) => {
                    const selfie_url = sub.selfie_path
                        ? supabase.storage.from("verifications").getPublicUrl(sub.selfie_path).data.publicUrl
                        : null;
                    const id_url = sub.id_path
                        ? supabase.storage.from("verifications").getPublicUrl(sub.id_path).data.publicUrl
                        : null;
                    const fullbody_url = sub.fullbody_path
                        ? supabase.storage.from("verifications").getPublicUrl(sub.fullbody_path).data.publicUrl
                        : null;

                    // 3️⃣ Fetch user email & name from profiles
                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("full_name, email")
                        .eq("user_id", sub.user_id)
                        .single();

                    return {
                        ...sub,
                        selfie_url,
                        id_url,
                        fullbody_url,
                        profile: profileData || { full_name: "Unknown", email: "N/A" },
                    };
                })
            );

            setSubmissions(submissionsWithUrls);
        } catch (err) {
            console.error("Error fetching submissions:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const { error } = await supabase.from("verification").update({ status }).eq("id", id);
            if (error) throw error;

            fetchSubmissions(); // Refresh after update
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

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
                                            {sub.profile.full_name}
                                        </Typography>
                                        <Typography sx={{ color: "#ccc", mb: 2 }}>
                                            Email: {sub.profile.email}
                                        </Typography>
                                        <Typography sx={{ color: "#ccc", mb: 2 }}>
                                            Status: {sub.status}
                                        </Typography>

                                        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                                            {sub.selfie_url && <img src={sub.selfie_url} alt="Selfie" width={100} />}
                                            {sub.id_url && <img src={sub.id_url} alt="ID" width={100} />}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import supabase from "../../supabase";
import { useAuth } from "../../context/AuthContext";

const tiers = [
    {
        tier: 1,
        title: "Basic",
        description: "Access to basic features",
    },
    {
        tier: 2,
        title: "Pro",
        description: "More visibility and features",
    },
    {
        tier: 3,
        title: "Elite",
        description: "Maximum exposure and priority",
    },
];

const TierPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSelectTier = async (tier) => {
        if (!user) return;

        setLoading(true);

        const { error } = await supabase
            .from("memberships")
            .update({
                tier,
                status: "active",
            })
            .eq("user_id", user.id);

        setLoading(false);

        if (error) {
            console.error("Tier selection error:", error);
            alert("Failed to select tier");
            return;
        }

        navigate("/dashboard", { replace: true });
    };

    return (
        <Box sx={{ minHeight: "100vh", background: "#0a1f44", p: 4 }}>
            <Typography
                variant="h4"
                sx={{ color: "#fff", textAlign: "center", mb: 4 }}
            >
                Choose Your Membership Tier
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {tiers.map((item) => (
                    <Grid item xs={12} md={4} key={item.tier}>
                        <Card sx={{ backgroundColor: "#1f2a38", color: "#fff" }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Typography sx={{ mb: 3, color: "#ccc" }}>
                                    {item.description}
                                </Typography>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    onClick={() => handleSelectTier(item.tier)}
                                >
                                    Select Tier {item.tier}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TierPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const TiersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null);

    const tiers = [
        { id: 1, name: "Tier 1", benefits: "Basic features" },
        { id: 2, name: "Tier 2", benefits: "Extra features" },
        { id: 3, name: "Tier 3", benefits: "All features" },
    ];

    const handleSelectTier = async (tierId) => {
        if (!user) {
            toast.error("User not found");
            return;
        }

        if (loading) return; // prevent multiple clicks

        setLoading(true);
        setSelectedTier(tierId);

        try {
            // Upsert the tier selection
            const { data, error } = await supabase
                .from("memberships")
                .upsert(
                    {
                        user_id: user.id,
                        tier: tierId,
                        status: "active",
                        updated_at: new Date().toISOString()
                    },
                    { onConflict: "user_id" }
                )
                .select();

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }

            // Wait a bit to ensure the database has processed the update
            await new Promise(resolve => setTimeout(resolve, 500));

            toast.success(`Tier ${tierId} selected successfully!`);

            // Navigate after a small delay to ensure state is updated
            setTimeout(() => {
                navigate("/dashboard", { replace: true });
            }, 100);

        } catch (err) {
            console.error("Error selecting tier:", err);
            toast.error("Failed to select tier. Please try again.");
            setLoading(false);
            setSelectedTier(null);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Select Your Tier</h2>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        style={{
                            border: selectedTier === tier.id ? "2px solid #10b981" : "1px solid #ccc",
                            padding: "1rem",
                            borderRadius: "8px",
                            width: "200px",
                            textAlign: "center",
                            backgroundColor: selectedTier === tier.id ? "#f0fdf4" : "white",
                        }}
                    >
                        <h3>{tier.name}</h3>
                        <p>{tier.benefits}</p>
                        <button
                            onClick={() => handleSelectTier(tier.id)}
                            disabled={loading}
                            style={{
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "5px",
                                cursor: loading ? "not-allowed" : "pointer",
                                backgroundColor: loading && selectedTier === tier.id ? "#94a3b8" : "#3B82F6",
                                color: "white",
                                border: "none",
                                fontWeight: "600",
                            }}
                        >
                            {loading && selectedTier === tier.id ? "Selecting..." : "Select"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TiersPage;
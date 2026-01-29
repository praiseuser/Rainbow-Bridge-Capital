import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const tiers = [
    { id: 1, name: "Tier 1", benefits: "Basic benefits" },
    { id: 2, name: "Tier 2", benefits: "Standard benefits" },
    { id: 3, name: "Tier 3", benefits: "Premium benefits" },
];

const TierPage = () => {
    const { user, membership } = useAuth();
    const [loadingTierId, setLoadingTierId] = useState(null);
    const navigate = useNavigate();

    const handleSelectTier = async (tierId) => {
        if (!user) return toast.error("User not found");

        setLoadingTierId(tierId);

        try {
            // ✅ Upsert membership row to avoid duplicate key error
            const { error: upsertError } = await supabase
                .from("memberships")
                .upsert(
                    {
                        user_id: user.id,
                        tier: tierId,
                        status: "active",
                    },
                    { onConflict: "user_id" } // ensures update if row exists
                );

            if (upsertError) throw upsertError;

            toast.success(`Tier ${tierId} selected successfully!`);
            navigate("/dashboard"); // redirect to dashboard after selecting tier
        } catch (err) {
            console.error("Error selecting tier:", err);
            toast.error("Failed to select tier");
        } finally {
            setLoadingTierId(null);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
            <h2>Select Your Tier</h2>
            <p>Please select a tier to unlock your membership benefits.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <strong>{tier.name}</strong>
                            <p>{tier.benefits}</p>
                        </div>
                        <button
                            onClick={() => handleSelectTier(tier.id)}
                            disabled={loadingTierId === tier.id}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                                backgroundColor: loadingTierId === tier.id ? "#ccc" : "#6366f1",
                                color: "#fff",
                                border: "none",
                                cursor: loadingTierId === tier.id ? "not-allowed" : "pointer",
                            }}
                        >
                            {loadingTierId === tier.id ? "Selecting..." : "Select"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TierPage;

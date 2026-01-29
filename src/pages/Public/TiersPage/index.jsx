import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const TiersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loadingTierId, setLoadingTierId] = useState(null);

    const tiers = [
        { id: 1, name: "Tier 1", benefits: "Basic features" },
        { id: 2, name: "Tier 2", benefits: "Extra features" },
        { id: 3, name: "Tier 3", benefits: "All features" },
    ];

    const handleSelectTier = async (tierId) => {
        if (!user) return toast.error("User not found");

        setLoadingTierId(tierId);

        try {
            // Upsert membership row so duplicates are handled
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
            navigate("/dashboard"); // redirect to dashboard after selection
        } catch (err) {
            console.error("Error selecting tier:", err);
            toast.error("Failed to select tier");
        } finally {
            setLoadingTierId(null); // ✅ reset loading
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
                            border: "1px solid #ccc",
                            padding: "1rem",
                            borderRadius: "8px",
                            width: "200px",
                            textAlign: "center",
                        }}
                    >
                        <h3>{tier.name}</h3>
                        <p>{tier.benefits}</p>
                        <button
                            onClick={() => handleSelectTier(tier.id)}
                            disabled={loadingTierId === tier.id}
                            style={{
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "5px",
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

export default TiersPage;

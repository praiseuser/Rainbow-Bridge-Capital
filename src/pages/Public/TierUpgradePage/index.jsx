import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const TierUpgradePage = () => {
    const { user, membership } = useAuth();
    const [loading, setLoading] = useState(false);

    if (!membership) return <p>Loading your current tier...</p>;

    // Only allow upgrades to higher tiers
    const availableTiers = [2, 3, 4, 5].filter((tier) => tier > membership.tier);

    const handleRequestUpgrade = async (tierId) => {
        if (loading) return;
        setLoading(true);

        try {
            const { error } = await supabase.from("tier_requests").insert([
                {
                    user_id: user.id,
                    current_tier: membership.tier,
                    requested_tier: tierId,
                    status: "pending",
                },
            ]);

            if (error) throw error;

            toast.success(`Upgrade request to Tier ${tierId} submitted!`);
        } catch (err) {
            console.error("Error submitting upgrade request:", err);
            toast.error("Failed to submit upgrade request");
        } finally {
            setLoading(false);
        }
    };

    if (availableTiers.length === 0)
        return <p>You are already on the highest tier!</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Your Current Tier: Tier {membership.tier}</h2>
            <h3>Select a higher tier to request upgrade:</h3>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                {availableTiers.map((tier) => (
                    <div
                        key={tier}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            borderRadius: "8px",
                            width: "180px",
                            textAlign: "center",
                        }}
                    >
                        <h3>Tier {tier}</h3>
                        <button
                            onClick={() => handleRequestUpgrade(tier)}
                            disabled={loading}
                            style={{
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "5px",
                                cursor: loading ? "not-allowed" : "pointer",
                            }}
                        >
                            {loading ? "Requesting..." : "Request Upgrade"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TierUpgradePage;

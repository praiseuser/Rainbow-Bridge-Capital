import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { useAuth } from "../../context/AuthContext";

const tiers = [
    { level: 1, name: "Bronze" },
    { level: 2, name: "Silver" },
    { level: 3, name: "Gold" },
    { level: 4, name: "Platinum" },
    { level: 5, name: "Diamond" },
];

const TiersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const chooseTier = async (tier) => {
        if (!user) return;

        setLoading(true);

        const { error } = await supabase.from("memberships").insert({
            user_id: user.id,
            tier,
            status: "active",
        });

        setLoading(false);

        if (error) {
            console.error(error);
            alert("Failed to select tier");
            return;
        }

        // ✅ Go to dashboard after choosing tier
        navigate("/dashboard", { replace: true });
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Choose Your Membership Tier</h2>
            <p>You must select a tier to continue</p>

            <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
                {tiers.map((t) => (
                    <button
                        key={t.level}
                        onClick={() => chooseTier(t.level)}
                        disabled={loading}
                        style={{
                            padding: "20px 30px",
                            cursor: "pointer",
                            fontSize: 16,
                        }}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TiersPage;

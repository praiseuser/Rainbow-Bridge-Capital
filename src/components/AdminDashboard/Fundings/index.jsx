import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import toast from "react-hot-toast";

const AdminFundings = () => {
    const [fundings, setFundings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchFundings = async () => {
        setLoading(true);
        try {
            // Fetch fundings and join with public.users
            const { data, error } = await supabase
                .from("wallet_fundings")
                .select("*, user:users(email)")
                .order("created_at", { ascending: false });

            if (error) throw error;

            setFundings(data);
        } catch (err) {
            console.error("Error fetching fundings:", err);
            toast.error("Failed to load fundings");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchFundings();
    }, []);

    const approveFunding = async (funding) => {
        try {
            setProcessingId(funding.id);
            toast.loading("Approving...");

            const { data: wallet, error: walletError } = await supabase
                .from("wallets")
                .select("*")
                .eq("user_id", funding.user_id)
                .single();
            if (walletError) throw walletError;

            const { error: walletUpdateError } = await supabase
                .from("wallets")
                .update({ balance: wallet.balance + funding.amount })
                .eq("user_id", funding.user_id);
            if (walletUpdateError) throw walletUpdateError;

            const { error: fundingUpdateError } = await supabase
                .from("wallet_fundings")
                .update({ status: "approved" })
                .eq("id", funding.id);
            if (fundingUpdateError) throw fundingUpdateError;

            toast.dismiss();
            toast.success("Funding approved");
            fetchFundings();
        } catch (err) {
            console.error(err);
            toast.dismiss();
            toast.error("Approval failed");
        } finally {
            setProcessingId(null);
        }
    };

    const rejectFunding = async (funding) => {
        try {
            setProcessingId(funding.id);
            const { error } = await supabase
                .from("wallet_fundings")
                .update({ status: "rejected" })
                .eq("id", funding.id);
            if (error) throw error;

            toast.success("Funding rejected");
            fetchFundings();
        } catch (err) {
            console.error(err);
            toast.error("Reject failed");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) return <p>Loading fundings...</p>;

    return (
        <div>
            <h2>Wallet Fundings</h2>
            {fundings.length === 0 && <p>No fundings found.</p>}
            {fundings.map((f) => (
                <div
                    key={f.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "1rem",
                        marginBottom: "1rem",
                        borderRadius: "8px",
                    }}
                >
                    <p><strong>User:</strong> {f.user?.email || "Unknown"}</p>
                    <p><strong>Amount:</strong> ${f.amount}</p>
                    <p><strong>Crypto:</strong> {f.crypto_wallet}</p>
                    <p><strong>TX Hash:</strong> {f.tx_hash}</p>
                    <p><strong>Status:</strong> {f.status}</p>

                    {f.status === "pending" && (
                        <>
                            <button
                                onClick={() => approveFunding(f)}
                                disabled={processingId === f.id}
                                style={{ backgroundColor: "green", color: "#fff", marginRight: "10px" }}
                            >
                                {processingId === f.id ? "Processing..." : "Approve"}
                            </button>
                            <button
                                onClick={() => rejectFunding(f)}
                                disabled={processingId === f.id}
                                style={{ backgroundColor: "red", color: "#fff" }}
                            >
                                {processingId === f.id ? "Processing..." : "Reject"}
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdminFundings;

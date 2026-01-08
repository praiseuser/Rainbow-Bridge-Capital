import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            try {
                // Read session from URL
                await supabase.auth.getSessionFromUrl({ storeSession: true });

                // Get the current user (even if session is null)
                const user = supabase.auth.getUser();

                if (user) {
                    // User exists, go to onboarding
                    navigate("/onboarding", { replace: true });
                } else {
                    // No user, fallback to login
                    navigate("/login", { replace: true });
                }
            } catch (err) {
                console.error("Auth callback error:", err);
                navigate("/login", { replace: true });
            }
        };

        handleAuth();
    }, [navigate]);

    return (
        <div style={{ padding: 40, textAlign: "center" }}>
            <h2>Verifying your email…</h2>
            <p>Please wait, finishing setup.</p>
        </div>
    );
};

export default AuthCallback;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("Auth callback error:", error);
          navigate("/login", { replace: true });
          return;
        }

        if (data?.session) {
          // ✅ Verified, now go to onboarding
          navigate("/onboarding", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Auth callback unexpected error:", err);
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

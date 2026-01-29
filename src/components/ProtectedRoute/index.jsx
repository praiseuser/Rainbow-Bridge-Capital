import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading, profile, membership, fetchMembership } = useAuth(); // Add fetchMembership
  const location = useLocation();

  // Re-fetch membership when navigating to dashboard
  useEffect(() => {
    if (user && location.pathname.startsWith("/dashboard")) {
      fetchMembership(user.id);
    }
  }, [location.pathname, user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  // Allow verify pages
  if (
    location.pathname === "/verify" ||
    location.pathname === "/verify/status"
  ) {
    return children;
  }

  // Verification logic
  if (profile?.verification_status === "not_verified")
    return <Navigate to="/verify" replace />;
  if (profile?.verification_status === "pending")
    return <Navigate to="/verify/status" replace />;
  if (profile?.verification_status === "rejected")
    return <Navigate to="/verify" replace />;

  // ✅ VERIFIED but NO TIER (skip this check if we're on tiers page or just came from it)
  if (!membership && location.pathname !== "/tiers" && !location.state?.fromTiers) {
    return <Navigate to="/tiers" replace />;
  }

  return children;
};

export default ProtectedRoute;
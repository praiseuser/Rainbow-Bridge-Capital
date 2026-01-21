import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading, profile } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  // Allow access to verify pages without redirect loop
  if (location.pathname === "/verify" || location.pathname === "/verify/status") {
    return children;
  }

  // Verification checks - only redirect if verification_status exists
  if (profile?.verification_status === "not_verified") return <Navigate to="/verify" replace />;
  if (profile?.verification_status === "pending") return <Navigate to="/verify/status" replace />;
  if (profile?.verification_status === "rejected") return <Navigate to="/verify" replace />;

  return children;
};

export default ProtectedRoute;
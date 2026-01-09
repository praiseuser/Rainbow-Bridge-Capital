import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, skipOnboardingCheck = false }) => {
  const { user, loading, profile } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user hasn't completed onboarding and we're not on the onboarding page
  if (!skipOnboardingCheck && profile && !profile.onboarding_completed) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
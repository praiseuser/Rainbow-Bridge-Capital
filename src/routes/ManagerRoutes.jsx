import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerRoute = ({ children }) => {
    const { user, membership, role, loading } = useAuth();

    if (loading) return null;

    if (!user) return <Navigate to="/login" replace />;

    // Must be manager
    if (role !== "manager") return <Navigate to="/dashboard" replace />;

    // Must be Tier 3+
    if (!membership || membership.tier < 3)
        return <Navigate to="/dashboard" replace />;

    return children;
};

export default ManagerRoute;

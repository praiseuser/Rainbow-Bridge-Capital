import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    // Not logged in → go to login
    if (!user) return <Navigate to="/login" replace />;

    // Not admin → go to login (or a 403 page)
    if (user.user_metadata?.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    // Admin → allow access
    return children;
};

export default AdminRoute;

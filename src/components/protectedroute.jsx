import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../context/authContext";

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user } = useAuth(); // Use context instead of localStorage
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (adminOnly && user.role !== "superuser") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

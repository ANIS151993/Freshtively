import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute() {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <LoadingSpinner label="Checking account" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

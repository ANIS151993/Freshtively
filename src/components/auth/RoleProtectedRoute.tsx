import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/firestore";

export function RoleProtectedRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const { currentUser, profile, loading, roleHomePath } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <LoadingSpinner label="Checking permissions" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <Navigate to="/under-review" replace />;
  }

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/access-denied" replace state={{ returnTo: roleHomePath }} />;
  }

  return <Outlet />;
}

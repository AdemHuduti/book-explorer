import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, to = "/login" }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to={to} replace />;
  }

  return children;
};

export default ProtectedRoute;

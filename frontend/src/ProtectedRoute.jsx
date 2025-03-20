import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
  
    if (loading)
      return (
        <div className="h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Checking authentication...</p>
        </div>
      );
  
    return user ? children : <Navigate to="/login" />;
  };


  export default ProtectedRoute;
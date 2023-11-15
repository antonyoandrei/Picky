import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const redirect = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect();
      }
    };

    redirect();
  }, [isAuthenticated, loginWithRedirect]);

  return isAuthenticated ? children : <Navigate to={'/'} />;
};

export default PrivateRoutes;

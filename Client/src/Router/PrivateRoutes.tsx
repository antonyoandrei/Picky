import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const location = useLocation();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      if (!isAuthenticated && !isLoading) {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname }
        });
      } else {
        setInitializing(false);
      }
    };

    redirect();
  }, [isAuthenticated, isLoading, loginWithRedirect, location.pathname]);

  if (isLoading || initializing) {
    return (
      <div className="cradle-wrapper">
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      </div>
    )
  };

  return isAuthenticated ? children : <Navigate to={'/'} />;
};

export default PrivateRoutes;

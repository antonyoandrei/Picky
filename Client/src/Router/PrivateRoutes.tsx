import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Auth/authContext";

interface PrivateRoutesProps {
    children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    const { isLogged } = useContext(AuthContext)

    return isLogged ? children : <Navigate to={"/log-in"} />
}

export default PrivateRoutes
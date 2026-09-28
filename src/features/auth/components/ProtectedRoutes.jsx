import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context.jsx";
import { Navigate } from "react-router";

function ProtectedRoutes({children}) {
    const { user } = useContext(AuthContext);

    if(!user) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <>
            {children}
        </>
    );
}

export { ProtectedRoutes };
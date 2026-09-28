import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context.jsx";
import { Navigate } from "react-router";

function ProtectedRoutes({children}) {
    const { user, loading } = useContext(AuthContext);

    if(loading) {
        return <p className="text-center mt-4">Loading...</p>
    }

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
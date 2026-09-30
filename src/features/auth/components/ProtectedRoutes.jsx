import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context.jsx";

function ProtectedRoutes({children}) {
    const { loading } = useContext(AuthContext);

    if(loading) {
        return <p className="text-center mt-4">Loading...</p>
    }

    return (
        <>
            {children}
        </>
    );
}

export { ProtectedRoutes };
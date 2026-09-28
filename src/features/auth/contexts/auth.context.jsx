import { useState, createContext, useEffect } from "react";
import { getMe } from "../services/auth.api.js";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAndSetUser() {
            try {
                const data = await getMe();
                setUser(data.user);
            }
            catch(error) {
                console.log(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        getAndSetUser();
    }, []);

    return <AuthContext value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext>
}
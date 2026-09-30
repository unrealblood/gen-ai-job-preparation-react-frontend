import { useState, createContext, useEffect } from "react";
import { getMe } from "../services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function initAuth() {
            try {
                const data = await getMe();
                if (data?.user) {
                    setUser(data.user);
                }
            }
            catch (err) {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }

        initAuth();
    }, []);

    return <AuthContext value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext>
}
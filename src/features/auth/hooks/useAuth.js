import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
import { registerUser, login, logout } from "../services/auth.api.js";

export function useAuth() {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    async function handleRegister({name, email, password}) {
        setLoading(true);

        try {
            await registerUser({name, email, password});
        }
        catch(error) {
            const statusCode = error.response?.status;
            
            const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Registration failed";

            throw {
                statusCode,
                message,
            };
        }
        finally {
            setLoading(false);
        }
    }

    async function handleLogin({email, password}) {
        setLoading(true);

        try {
            const data = await login({email, password});
            
            if(data?.user) {
                setUser(data?.user);
            }
        }
        catch(error) {
            const statusCode = error.response?.status;
            
            const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Login failed";

            throw {
                statusCode,
                message,
            };
        }
        finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);

        try {
            await logout();
            setUser(null);
        }
        catch(error) {
            const statusCode = error.response?.status;
            
            const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Logout failed";

            throw {
                statusCode,
                message,
            };
        }
        finally {
            setLoading(false);
        }
    }

    return {user, loading, handleRegister, handleLogin, handleLogout};
}
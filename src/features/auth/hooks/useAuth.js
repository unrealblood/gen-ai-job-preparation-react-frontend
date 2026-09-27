import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
import { registerUser, login, logout } from "../services/auth.api.js";

export function useAuth() {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    async function handleRegister({name, email, password}) {
        setLoading(true);

        const data = await registerUser({name, email, password});
        console.log(data);

        setLoading(false);
    }

    async function handleLogin({email, password}) {
        setLoading(true);

        const data = await login({email, password});
        setUser(data.user);
        console.log(data);

        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);

        const data = await logout();
        setUser(null);
        console.log(data);

        setLoading(false);
    }

    return {user, loading, handleRegister, handleLogin, handleLogout};
}
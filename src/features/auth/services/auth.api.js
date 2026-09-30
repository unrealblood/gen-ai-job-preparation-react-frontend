import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    withCredentials: true
})

export async function registerUser({name, email, password}) {
    const response = await api.post("/api/auth/register-user", {
        name,
        email,
        password
    });

    return response.data;
}

export async function login({email, password}) {
    const response = await api.post("/api/auth/login", {
        email,
        password
    });

    return response.data;
}

export async function logout() {
    const response = await api.get("/api/auth/logout");

    return response.data;
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me");
    return response.data;
}
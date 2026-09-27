import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

export async function registerUser({name, email, password}) {
     try{
        const respose = await api.post("/api/auth/register-user", {
            name,
            email,
            password
        });

        return respose.data;
    }
    catch(error) {
        throw new Error(error.message);
    }
}

export async function login({email, password}) {
     try{
        const respose = await api.post("/api/auth/login", {
            email,
            password
        });

        return respose.data;
    }
    catch(error) {
        throw new Error(error.message);
    }
}

export async function logout() {
     try{
        const respose = await api.get("/api/auth/logout");

        return respose.data;
    }
    catch(error) {
        throw new Error(error.message);
    }
}
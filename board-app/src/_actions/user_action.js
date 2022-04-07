import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
    const request = axios
        .post("/api/users/login", dataToSubmit)
        .then((res) => res.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function RegisterUser(dataToSubmit) {
    const request = axios
        .post("/api/users/register", dataToSubmit)
        .then((res) => res.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export async function auth() {
    const request = await axios.post("/api/users/auth").then((res) => res.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}

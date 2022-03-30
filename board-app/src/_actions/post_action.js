import axios from "axios";
import { GET_POSTS } from "./types";

export function post() {
    const request = axios.get("/api/getposts").then((res) => res.data);

    return {
        type: GET_POSTS,
        payload: request,
    };
}

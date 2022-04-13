import axios from "axios";
import { GET_POSTS } from "./types";

export function post(dataToSubmit) {
    const request = axios
        .post("/api/getposts", dataToSubmit)
        .then((res) => res.data);

    return {
        type: GET_POSTS,
        payload: request,
    };
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ({ children }) {
    const user = useSelector((state) => state.user.userData);
    let data;
    // const getPost = async () => {
    //     await axios.get(`/api/posts/${id}`).then((res) => {
    //         data = res.data;
    //     });
    // };

    return user.email === null ? children : <Navigate to="/board" />;
}

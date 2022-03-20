import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

//option true는 로그인한 유저만 가능
//option false는 로그인 안한 유저만 가능
export default function PrivateRoute({ children }) {
    console.log(children);
    const dispatch = useDispatch();
    let isAuth, isAdmin;

    dispatch(auth()).then((res) => {
        isAuth = res.payload.isAuth;
        isAdmin = res.payload.isAdmin;
    });
    console.log(isAuth);
    return isAuth ? children : <Navigate to="/login" />;
    // else return isAuth ? <Navigate to="/login" /> : children;
}

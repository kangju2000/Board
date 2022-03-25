import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ({ children }) {
    const user = useSelector((state) => state.user.userData);
    const option = children.props.option;
    if (option) return user.isAuth ? children : <Navigate to="/login" />;
    // option true 은 회원만 출입 가능, 비회원은 로그인 페이지로 이동
    // else if (option === "null") return children;
    // // option null 은 아무나 출입 가능
    else return user.isAuth ? <Navigate to="/board" /> : children;
    // option false 은 비회원만 출입 가능, 회원이 출입하면 메인 페이지로 이동
}

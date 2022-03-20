import React from "react";
import styled from "styled-components";
import Auth from "../../../hoc/auth";
function LandingPage(props) {
    return (
        <>
            <p>로그인하세요 ^^</p>
        </>
    );
}

export default Auth(LandingPage, null);

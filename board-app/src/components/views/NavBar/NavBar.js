import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { DefaultLink } from "../../../styles/styles";

export default function NavBar(props) {
    return (
        <NavigationBar expand={false}>
            <NavContainer>
                <NavTitle>
                    <DefaultLink to="/">📋</DefaultLink>
                </NavTitle>
                <NavRight>
                    <DefaultLink to="/board">
                        <NavLoginBtn>게시판</NavLoginBtn>
                    </DefaultLink>
                    <DefaultLink to="/login">
                        <NavLoginBtn>
                            {props.user.isAuth || false
                                ? props.user.name
                                : "로그인"}
                        </NavLoginBtn>
                    </DefaultLink>
                </NavRight>
            </NavContainer>
        </NavigationBar>
    );
}

const NavigationBar = styled(Navbar)`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 5;
`;
const NavContainer = styled.div`
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const NavTitle = styled(Navbar.Brand)`
    flex-grow: 1;
    font-size: 25px;
    padding-left: 30px;
`;

const NavRight = styled(Navbar.Brand)``;

const NavLoginBtn = styled.button`
    border: none;
    background-color: inherit;
    display: inline-block;
`;

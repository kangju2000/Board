import React, { useState } from "react";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {
    // const [toggle, setToggle] = useState(false); //사이드 링크 클릭시 사이드바 닫히도록 설정

    return (
        <NavigationBar expand={false}>
            <NavContainer>
                {/* <NavSideBtn aria-controls="offcanvasNavbar" />
                <SideBar
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton style={navColor}>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            BOARD
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavLink to="/login">로그인</NavLink>
                            <NavLink to="/register">회원가입</NavLink>
                        </Nav>
                    </Offcanvas.Body>
                </SideBar> */}
                <NavTitle>
                    <NavLink to="/">📋게시판</NavLink>
                </NavTitle>
                <NavRight>
                    <NavLink to="/register">
                        <NavLoginBtn>회원가입</NavLoginBtn>
                    </NavLink>
                    <NavLink to="/login">
                        <NavLoginBtn>로그인</NavLoginBtn>
                    </NavLink>
                </NavRight>
            </NavContainer>
        </NavigationBar>
    );
}

const NavigationBar = styled(Navbar)`
    width: 100%;
    position: sticky;
    top: 0;
    background-color: white;
`;
const NavContainer = styled.div`
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
// const NavSideBtn = styled(Navbar.Toggle)`
//     border: 0 !important;
// `;
// const SideBar = styled(Navbar.Offcanvas)`
//     width: 250px;
// `;
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

const NavLink = styled(Link)`
    color: black !important;
    text-decoration: none;
    cursor: pointer;
`;

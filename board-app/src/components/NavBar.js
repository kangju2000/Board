import React from "react";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

var navColor = { backgroundColor: "#24a19c" };
export default function NavBar() {
    return (
        <NavigationBar expand={false}>
            <NavContainer>
                <NavSideBtn aria-controls="offcanvasNavbar" />
                <SideBar
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton style={navColor}>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            PLANNER
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#action1">ㅇㅇ</Nav.Link>
                            <Nav.Link href="#action2">ㅎㅎ</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </SideBar>
                <NavTitle>
                    <Link
                        to="/"
                        style={{
                            color: "inherit",
                            textDecoration: "inherit",
                        }}
                    >
                        PLANNER
                    </Link>
                </NavTitle>
                <Navbar.Brand>
                    <NavLoginBtn>로그인</NavLoginBtn>
                </Navbar.Brand>
            </NavContainer>
        </NavigationBar>
    );
}

const NavigationBar = styled(Navbar)`
    width: 100%;
    position: sticky;
    top: 0;
    ${navColor}
`;
const NavContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const NavSideBtn = styled(Navbar.Toggle)`
    border: 0 !important;
`;
const SideBar = styled(Navbar.Offcanvas)`
    width: 250px;
    background-color: #faeee7;
`;
const NavTitle = styled(Navbar.Brand)`
    cursor: pointer;
    font-size: 25px;
`;
const NavLoginBtn = styled.button`
    border: none;
    background-color: inherit;
    display: inline-block;
`;

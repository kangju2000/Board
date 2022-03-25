import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Auth from "../../../hoc/auth";
import { DefaultDiv } from "../../../styles/styles";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { auth } from "../../../_actions/user_action";

function LandingPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then((res) => console.log(res));
    }, []);
    return (
        <MainDiv>
            <Header>
                <h1>게시판</h1>
            </Header>
            <Content>
                <p>연습삼아 만든 React+express 게시판입니다.</p>
                <Link to="/board">
                    <Button type="primary">게시판 이동</Button>
                </Link>
            </Content>
        </MainDiv>
    );
}
const MainDiv = styled(DefaultDiv)`
    text-align: center;
`;

const Header = styled.div`
    margin-top: 50px;
    h1 {
        font-size: 60px;
    }
`;
const Content = styled.div`
    margin-top: 50px;
    p {
        font-size: 30px;
    }
`;

export default LandingPage;

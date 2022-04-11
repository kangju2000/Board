import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DefaultDiv, BodyColor } from "../../../styles/styles";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { auth } from "../../../_actions/user_action";

export default function LandingPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then((res) => console.log(res));
    }, []);
    return (
        <MainDiv>
            <Header>
                <h1>👉게시판👈</h1>
            </Header>
            <Content>
                <p>React+express 게시판입니다.</p>
                <Link to="/board">
                    <MainBtn type="primary" size="large">
                        START
                    </MainBtn>
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
    font-family: Suit-Bold;
    h1 {
        font-size: 60px;
    }
`;
const Content = styled.div`
    margin-top: 50px;
    p {
        margin: 30px;
        font-size: 30px;
    }
`;

const MainBtn = styled(Button)`
    width: 300px;
    height: 100px;
    font-size: 30px;
    color: ${BodyColor};
`;

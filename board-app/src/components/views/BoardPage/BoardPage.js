import React from "react";
import styled from "styled-components";
import { BodyColor } from "../../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleUser);

export default function BoardPage() {
    return (
        <MainDiv>
            <SideDiv>
                <TitleDiv>
                    <h2>목록</h2>
                </TitleDiv>
            </SideDiv>
            <MainContentsDiv>
                <TitleDiv>
                    <h2>자유게시판</h2>
                </TitleDiv>
                <button>글쓰기</button>
            </MainContentsDiv>
            <ProfileDiv>
                <TitleDiv>
                    <h2>프로필</h2>
                </TitleDiv>
                <FontAwesomeIcon icon="circle-user" size="7x" />
            </ProfileDiv>
        </MainDiv>
    );
}

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    padding: 30px;
    display: flex;
    text-align: center;
    h2 {
        margin: 10px;
    }
`;

const SideDiv = styled.div`
    background-color: white;
    width: 20%;
    height: 50vh;
    margin-right: 10px;
`;

const MainContentsDiv = styled.div`
    background-color: white;
    width: 50%;
    height: 80vh;
    margin-right: 10px;
`;

const ProfileDiv = styled.div`
    background-color: white;
    width: 30%;
    height: 50vh;
`;

const TitleDiv = styled.div`
    border-bottom: 3px solid ${BodyColor};
`;

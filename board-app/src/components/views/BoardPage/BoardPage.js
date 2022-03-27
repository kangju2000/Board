import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BodyColor, DefaultDiv } from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { DefaultLink } from "../../../styles/styles";

function BoardPage() {
    const user = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const onClickHandler = async () => {
        await axios.get("/api/users/logout").then((res) => {
            navigate("/");
        });
    };
    const aa = async () => {
        await axios.get("/api/getposts").then((res) => {
            setPosts(res.data);
        });
    };
    useEffect(() => {
        aa();
    }, []);

    return (
        <DefaultDiv>
            <button onClick={onClickHandler}>로그아웃</button>
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
                    <DefaultLink to="/add">
                        <button>글쓰기</button>
                    </DefaultLink>
                    {posts.map((post, id) => {
                        return <Post post={post} id={id} key={id} />;
                    })}
                </MainContentsDiv>
                <ProfileDiv>
                    <TitleDiv>
                        <h2>프로필</h2>
                    </TitleDiv>
                    <UserOutlined style={{ fontSize: "100px" }} />
                    <p>{user.email}</p>
                    <p>{user.name}</p>
                    <br />
                    <p>{user.intro}</p>
                </ProfileDiv>
            </MainDiv>
        </DefaultDiv>
    );
}

export default BoardPage;

function Post(props) {
    let url = `/posts/${props.id + 1}`;
    return (
        <DefaultLink to={url}>
            <div>
                <p>작성자: {props.post.writer}</p>
                <p>제목: {props.post.title}</p>
                <p>내용: {props.post.content}</p>
                <p>날짜: {props.post.writeDate}</p>
                <hr />
            </div>
        </DefaultLink>
    );
}

const MainDiv = styled(DefaultDiv)`
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

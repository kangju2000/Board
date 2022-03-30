import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BodyColor, DefaultDiv } from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { post } from "../../../_actions/post_action";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { DefaultLink } from "../../../styles/styles";
import { Button } from "antd";

function BoardPage() {
    const user = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);

    const onClickHandler = async () => {
        await axios.get("/api/users/logout").then((res) => {
            navigate("/");
        });
    };
    const getPosts = async () => {
        await dispatch(post()).then((res) => {
            setPosts(res.payload);
        });
    };
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <DefaultDiv>
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

                    {posts.map((post, id) => {
                        return (
                            <Post post={post} post_id={post.post_id} key={id} />
                        );
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
                    <DefaultLink to="/add" style={{ display: "block" }}>
                        <Button type="primary">글쓰기</Button>
                    </DefaultLink>
                    <DefaultLink to="/profile">
                        <Button>프로필 수정</Button>
                    </DefaultLink>
                    <Button onClick={onClickHandler} type="primary" danger>
                        로그아웃
                    </Button>
                </ProfileDiv>
            </MainDiv>
        </DefaultDiv>
    );
}

export default BoardPage;

function Post(props) {
    return (
        <DefaultLink
            to={`/posts/${props.post_id}`}
            state={{
                post: props.post,
            }}
        >
            <div>
                <p>작성자: {props.post.writer}</p>
                <p>제목: {props.post.title}</p>
                <hr />
            </div>
        </DefaultLink>
    );
}
const D = styled.div`
    display: flex;
    flex-direction: column;
`;

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

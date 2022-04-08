import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BodyColor, DefaultDiv } from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { post } from "../../../_actions/post_action";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { DefaultLink } from "../../../styles/styles";
import { Form, Input, Button } from "antd";

export default function BoardPage() {
    const user = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [posts, setPosts] = useState([]);

    const onClickHandler = async () => {
        await axios.post("/api/users/logout").then((res) => {
            alert("로그아웃되었습니다.");
            navigate("/");
        });
    };
    const onFinishSearchHandler = async (values) => {
        axios.post("/api/search", values).then((res) => {
            setPosts(res.data);
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
                    <FormDiv
                        form={form}
                        name="search"
                        onFinish={onFinishSearchHandler}
                    >
                        <Form.Item name="title" style={{ width: "100%" }}>
                            <Input />
                        </Form.Item>
                        <Button htmlType="submit">검색</Button>
                    </FormDiv>
                    {posts.map((post, id) => {
                        return (
                            <Post
                                post={post}
                                user={user}
                                post_id={post.post_id}
                                key={id}
                            />
                        );
                    })}
                </MainContentsDiv>
                <ProfileDiv>
                    <TitleDiv>
                        <h2>프로필</h2>
                    </TitleDiv>
                    <UserOutlined style={{ fontSize: "100px" }} />
                    <p style={{ fontSize: "20px" }}>{user.name}</p>
                    <br />
                    <p>{user.intro}</p>

                    <ButtonDiv>
                        <DefaultLink to="/add" style={{ display: "block" }}>
                            <Button type="primary">글쓰기</Button>
                        </DefaultLink>
                        <DefaultLink to="/profile">
                            <Button>프로필 수정</Button>
                        </DefaultLink>
                        <Button onClick={onClickHandler} type="primary" danger>
                            로그아웃
                        </Button>
                    </ButtonDiv>
                </ProfileDiv>
            </MainDiv>
        </DefaultDiv>
    );
}

function Post(props) {
    return (
        <DefaultLink
            to={`/posts/${props.post_id}`}
            state={{
                post: props.post,
                user: props.user,
            }}
        >
            <PostDiv>
                <p>작성자: {props.post.writer}</p>
                <p>제목: {props.post.title}</p>
                <p>조회수: {props.post.views}</p>
            </PostDiv>
        </DefaultLink>
    );
}
const PostDiv = styled.div`
    border-top: 3px solid ${BodyColor};
    &:hover {
        background-color: ${BodyColor};
    }
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
    border-radius: 10px;
    width: 20%;
    height: 50vh;
    margin-right: 10px;
`;

const MainContentsDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 50%;
    margin-right: 10px;
`;

const ProfileDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 30%;
`;

const TitleDiv = styled.div`
    border-bottom: 3px solid ${BodyColor};
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    Button {
        width: 80%;
        max-width: 300px;
        margin: 0 auto;
        margin-top: 10px;
    }
`;

const FormDiv = styled(Form)`
    display: flex;
`;

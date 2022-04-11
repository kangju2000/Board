import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BodyColor, DefaultDiv } from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { post } from "../../../_actions/post_action";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { DefaultLink } from "../../../styles/styles";
import { Form, Input, Button, Col, Row } from "antd";

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
    //useCallback 쓰기
    const getPosts = useCallback(async () => {
        await dispatch(post()).then((res) => {
            setPosts(res.payload);
        });
    }, [setPosts]);
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <DefaultDiv>
            <MainDiv>
                <SideDiv>
                    <TitleDiv>
                        <h2>목록</h2>
                    </TitleDiv>
                </SideDiv>
                <MainContentDiv>
                    <TitleDiv>
                        <h2>자유게시판</h2>
                    </TitleDiv>

                    <HeaderPostDiv>
                        <Row gutter={24}>
                            <Col span={12}>
                                <p>제목</p>
                            </Col>
                            <Col span={6}>
                                <p>작성자</p>
                            </Col>
                            <Col span={6}>
                                <p>조회수</p>
                            </Col>
                        </Row>
                    </HeaderPostDiv>
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
                </MainContentDiv>
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
                <Row gutter={24}>
                    <Col span={12}>
                        <p>{props.post.title}</p>
                    </Col>
                    <Col span={6}>
                        <p>{props.post.writer}</p>
                    </Col>
                    <Col span={6}>
                        <p>{props.post.views}</p>
                    </Col>
                </Row>
            </PostDiv>
        </DefaultLink>
    );
}
const PostDiv = styled.div`
    border-top: 3px solid ${BodyColor};
    p {
        padding: 10px;
    }
    &:hover {
        background-color: ${BodyColor};
    }
`;
const HeaderPostDiv = styled(PostDiv)`
    &:hover {
        background-color: none;
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

const MainContentDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 50%;
    margin-right: 10px;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
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
    background-color: ${BodyColor};
`;

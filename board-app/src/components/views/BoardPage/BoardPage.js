import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BodyColor, DefaultDiv, DefaultLink } from "../../../styles/styles";
import { post } from "../../../_actions/post_action";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Col, Row, Pagination } from "antd";

export default function BoardPage() {
    const user = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [posts, setPosts] = useState([[], []]);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("자유게시판");
    const [page, setPage] = useState(1);
    const onClickHandler = async () => {
        await axios.post("/api/users/logout").then((res) => {
            alert("로그아웃되었습니다.");
            navigate("/");
        });
    };
    const pageSlice = (arr) => {
        let a = [];
        let b = [];
        for (let i = 0; i < arr.length; i++) {
            if (i % 8 != 0) {
                a.push(arr[i]);
            } else {
                b.push(a);
                a = [];
                a.push(arr[i]);
            }
        }
        if (a.length != 0) b.push(a);
        if (b.length != 0) setPosts(b);
        else {
            setPosts([[], []]);
        }
    };

    const onFinishSearchHandler = async (values) => {
        setPage(1);
        await axios.post("/api/search", values).then((res) => {
            pageSlice(res.data.reverse());
        });
    };

    const onChangePageHandler = async (value) => {
        setPage(value);
    };

    const getPosts = async () => {
        await dispatch(post({ post_type: type })).then((res) => {
            pageSlice(res.payload.reverse());
        });
    };
    useEffect(() => {
        getPosts();
    }, [type]);

    return (
        <DefaultDiv>
            <MainDiv>
                <SideDiv>
                    <TitleDiv>
                        <h2>목록</h2>
                    </TitleDiv>
                    <ButtonDiv>
                        <Button
                            onClick={() => {
                                setPage(1);
                                setType("");
                                setTitle("자유게시판");
                            }}
                        >
                            전체글
                        </Button>
                        <Button
                            onClick={() => {
                                setPage(1);
                                setType("free");
                                setTitle("자유게시판");
                            }}
                        >
                            자유게시판
                        </Button>
                        <Button
                            onClick={() => {
                                setPage(1);
                                setType("question");
                                setTitle("질문게시판");
                            }}
                        >
                            질문게시판
                        </Button>
                    </ButtonDiv>
                </SideDiv>
                <MainContentDiv>
                    <TitleDiv>
                        <h2>{title}</h2>
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
                    <div style={{ height: "400px" }}>
                        {posts[page].map((post, id) => {
                            return (
                                <Post
                                    post={post}
                                    user={user}
                                    post_id={post.post_id}
                                    key={id}
                                />
                            );
                        })}
                    </div>
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
                    <Pagination
                        defaultCurrent={1}
                        onChange={onChangePageHandler}
                        total={(posts.length - 1) * 10}
                    />
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
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:hover {
        background-color: ${BodyColor};
    }
`;
const HeaderPostDiv = styled(PostDiv)`
    border-top: none;
    p {
        padding: 0px;
        font-family: "Suit-Bold";
    }
    &:hover {
        background-color: white;
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
    height: 200px;
    margin-right: 10px;
`;

const MainContentDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 50%;
    height: 500px;
    margin-right: 10px;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`;

const ProfileDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 30%;
    height: 400px;
`;

const TitleDiv = styled.div`
    font-family: "Suit-Bold";
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
    background-color: none;
`;

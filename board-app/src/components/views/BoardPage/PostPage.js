import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultDiv, BodyColor, DefaultLink } from "../../../styles/styles";
import styled from "styled-components";
import { Form, Input, Button } from "antd";

function PostPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state.post;

    const onClickHandler = async () => {
        await axios
            .post("/api/users/deletepost", { post_id: post.post_id })
            .then((res) => {
                navigate("/board");
            });
    };
    return (
        <PostDiv>
            <TitleDiv>
                <h1>{post.title}</h1>
                <p style={{ float: "right" }}>{post.writeDate}</p>
                <p>{post.writer}</p>
                <DefaultLink
                    to={`/edit/${post.post_id}`}
                    state={{
                        post: post,
                    }}
                >
                    <Button>수정</Button>
                </DefaultLink>
                <Button onClick={onClickHandler}>삭제</Button>
            </TitleDiv>
            <ContentDiv>
                {post.content &&
                    post.content.split("\n").map((line, id) => {
                        return (
                            <>
                                {line}

                                <br />
                            </>
                        );
                    })}
            </ContentDiv>
            <ChatDiv>
                <p>댓글</p>
                <Form>
                    <Input />
                    <Button
                        style={{ float: "right" }}
                        type="primary"
                        htmlType="submit"
                    >
                        댓글 쓰기
                    </Button>
                </Form>
            </ChatDiv>
        </PostDiv>
    );
}

const PostDiv = styled(DefaultDiv)`
    width: 70%;
    height: 700px;
    margin: 0 auto;
    margin-top: 50px;
`;
const TitleDiv = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 10px;
`;
const ContentDiv = styled.div`
    min-height: 500px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
`;
const ChatDiv = styled.div``;

export default PostPage;

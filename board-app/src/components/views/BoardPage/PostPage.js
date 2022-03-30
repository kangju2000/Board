import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultDiv, BodyColor, DefaultLink } from "../../../styles/styles";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
function PostPage() {
    const navigate = useNavigate();
    let { id } = useParams();
    const location = useLocation();
    const post = location.state.post;
    const onClickHandler = async () => {
        await axios.post("/api/users/deletepost", { id }).then((res) => {
            navigate("/board");
        });
    };

    const getPost = async () => {
        console.log();
    };
    useEffect(() => {
        getPost();
    }, []);
    return (
        <PostDiv>
            <TitleDiv>
                <h1>{post.title}</h1>
                <p style={{ float: "right" }}>{post.writeDate}</p>
                <p>{post.writer}</p>
                <DefaultLink
                    to={`/edit/${id}`}
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
    background-color: white;
`;
const TitleDiv = styled.div`
    border-bottom: 3px solid ${BodyColor};
`;
const ContentDiv = styled.div`
    height: 500px;
    border-bottom: 3px solid ${BodyColor};
`;
const ChatDiv = styled.div``;

export default PostPage;

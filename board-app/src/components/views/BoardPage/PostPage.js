import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultDiv, BodyColor, DefaultLink } from "../../../styles/styles";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
function PostPage() {
    const [post, setPost] = useState([]);
    let { id } = useParams();
    const getPost = async () => {
        await axios.get(`/api/posts/${id}`).then((res) => {
            setPost(res.data);
        });
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
                <DefaultLink to={`/edit/${id}`}>
                    <Button>수정</Button>
                </DefaultLink>
                <Button>삭제</Button>
            </TitleDiv>
            <ContentDiv>
                <p>{post.content}</p>
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

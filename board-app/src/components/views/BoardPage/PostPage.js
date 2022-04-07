import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultDiv, BodyColor, DefaultLink } from "../../../styles/styles";
import styled from "styled-components";
import { Form, Input, Button } from "antd";

function PostPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state.post;
    const user = location.state.user;
    const [comments, setComments] = useState([]);
    const onClickEditHandler = (e) => {
        if (user.email !== post.email) {
            e.preventDefault();
            return alert("작성자만 수정할 수 있습니다.");
        }
    };
    const writeDate = post.writeDate.split(/\.|T|-|:/);
    const onClickDeleteHandler = async () => {
        if (user.email !== post.email) {
            return alert("작성자만 삭제할 수 있습니다.");
        }
        await axios
            .post("/api/users/deletepost", { post_id: post.post_id })
            .then((res) => {
                alert("삭제되었습니다.");
                navigate("/board");
            });
    };

    const onFinishCommentHandler = async (values) => {
        let newComment = {
            name: user.name,
            email: user.email,
            post_id: post.post_id,
            content: values.content,
        };
        axios.post("/api/users/comment", newComment).then((res) => {
            window.location.reload();
        });
    };
    const getcomments = async () => {
        await axios
            .post("/api/getcomments", { post_id: post.post_id })
            .then((res) => {
                setComments(res.data);
            });
    };
    useEffect(() => {
        getcomments();
    }, []);
    return (
        <PostDiv>
            <TitleDiv>
                <h1>{post.title}</h1>
                <p style={{ float: "right" }}>
                    {`${writeDate[0]}년 ${writeDate[1]}월 ${writeDate[2]}일`}
                    <br />
                    {`${writeDate[3]}시 ${writeDate[4]}분 ${writeDate[5]}초`}
                </p>
                <p>{post.writer}</p>
                <DefaultLink
                    to={`/edit/${post.post_id}`}
                    state={{
                        post: post,
                    }}
                >
                    <Button onClick={onClickEditHandler}>수정</Button>
                </DefaultLink>
                <Button onClick={onClickDeleteHandler}>삭제</Button>
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
                <ChatForm
                    form={form}
                    name="comment"
                    onFinish={onFinishCommentHandler}
                >
                    <Form.Item name="content">
                        <Input />
                    </Form.Item>

                    <CommentBtn type="primary" htmlType="submit">
                        댓글 쓰기
                    </CommentBtn>
                </ChatForm>
                <hr />
                {comments &&
                    comments.map((comment, id) => {
                        return (
                            <Comment comment={comment} user={user} key={id} />
                        );
                    })}
            </ChatDiv>
        </PostDiv>
    );
}

function Comment(props) {
    const cmt = props.comment;
    console.log(cmt);
    const writeDate = cmt.writeDate.split(/\.|T|-|:/);
    const onClickCmtHandler = async () => {
        if (props.user.email !== cmt.email) {
            return alert("작성자만 삭제할 수 있습니다.");
        }
        await axios
            .post("/api/users/deletecmt", { content: cmt.content })
            .then((res) => {
                alert("삭제되었습니다.");
                window.location.reload();
            });
    };
    return (
        <div>
            <label>{cmt.name}</label>
            <p>{cmt.content}</p>
            <p>
                {`${writeDate[0]}년 ${writeDate[1]}월 ${writeDate[2]}일`}
                <br />
                {`${writeDate[3]}시 ${writeDate[4]}분 ${writeDate[5]}초`}
            </p>
            <Button onClick={onClickCmtHandler}>삭제</Button>
            <hr />
        </div>
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
    margin-bottom: 10px;
`;
const ChatDiv = styled.div`
    padding: 10px;
    background-color: white;
    border-radius: 10px;
`;
const ChatForm = styled(Form)`
    &:after {
        content: "";
        display: block;
        clear: both;
    }
`;
const CommentBtn = styled(Button)`
    float: right;
`;

export default PostPage;

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BodyColor, DefaultDiv, DefaultLink } from "../../../styles/styles";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function PostPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state.post;
    const user = location.state.user;

    const a = useSelector((state) => state.post.getPosts);
    console.log(a);
    const [comments, setComments] = useState([]);
    const writeDate = post.writeDate.split(/\.|T|-|:/);

    const onClickEditHandler = (e) => {
        if (user.email !== post.email) {
            e.preventDefault();
            return alert("작성자만 수정할 수 있습니다.");
        }
    };
    const onClickDeleteHandler = async () => {
        if (user.email !== post.email) {
            return alert("작성자만 삭제할 수 있습니다.");
        }
        if (window.confirm("삭제하시겠습니까?")) {
            await axios
                .post("/api/users/deletepost", { post_id: post.post_id })
                .then((res) => {
                    alert("삭제되었습니다.");
                    navigate("/board");
                });
        }
    };
    const onFinishCommentHandler = async (values) => {
        let newComment = {
            name: user.name,
            email: user.email,
            post_id: post.post_id,
            content: values.content,
        };
        axios.post("/api/users/comment", newComment).then((res) => {
            getcomments();
            form.resetFields();
            // 잠깐 떴다 사라지는 알림 모달 창 만들기
        });
    };
    const addCount = async () => {
        await axios
            .post("/api/count", { post_id: post.post_id })
            .then(() => {});
    };
    const getcomments = async () => {
        await axios
            .post("/api/getcomments", { post_id: post.post_id })
            .then((res) => {
                setComments(res.data);
            });
    };
    useEffect(() => {
        addCount();
        getcomments();
    }, []);

    return (
        <PostDiv>
            <TitleDiv>
                <DefaultLink to="/board">
                    <BackBtn>
                        <ArrowLeftOutlined />
                    </BackBtn>
                </DefaultLink>
                <PostTypeStr type={post.post_type} />
                <h1>{post.title}</h1>
                <p>
                    {post.writer}
                    <br />
                    {`조회수: ${post.views}`}
                    <br />
                    {`${writeDate[0]}.${writeDate[1]}.${writeDate[2]}`}
                    <br />
                    {`${writeDate[3]}:${writeDate[4]}:${writeDate[5]}`}
                </p>
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
                    <Form.Item
                        name="content"
                        rules={[
                            { required: true, message: "댓글을 입력하세요" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <CommentBtn
                        type="primary"
                        htmlType="submit"
                        // onClick={handleClear}
                    >
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

//props 안쓰고 새로운 컴포넌트 만들어서 구현하기
function Comment(props) {
    const cmt = props.comment;
    const writeDate = cmt.writeDate.split(/\.|T|-|:/);
    const onClickCmtHandler = async () => {
        if (props.user.email !== cmt.email) {
            return alert("작성자만 삭제할 수 있습니다.");
        }
        if (window.confirm("삭제하시겠습니까?")) {
            await axios
                .post("/api/users/deletecmt", { content: cmt.content })
                .then((res) => {
                    alert("삭제되었습니다.");
                });
        }
    };
    return (
        <>
            <p style={({ fontSize: "16px" }, { fontWeight: "bold" })}>
                {cmt.name}
            </p>
            <p>{cmt.content}</p>
            <p style={{ fontSize: "11px" }}>
                {`${writeDate[0]}.${writeDate[1]}.${writeDate[2]} ${writeDate[3]}:${writeDate[4]}:${writeDate[5]} `}
                <Button onClick={onClickCmtHandler} size="small">
                    삭제
                </Button>
            </p>
            <br />
        </>
    );
}

function PostTypeStr(props) {
    if (props.type === "free") return <p>자유게시판</p>;
    else if (props.type === "question") return <p>질문게시판</p>;
    else return <></>;
}

const PostDiv = styled(DefaultDiv)`
    width: 70%;
    height: 700px;
    margin: 0 auto;
    margin-top: 50px;
`;
const BackBtn = styled.button`
    position: absolute;
    left: -60px;
    background-color: ${BodyColor};
    border: none;
    font-size: 30px;
    curser: pointer;
    width: 50px;
    height: 50px;
`;
const TitleDiv = styled.div`
    position: relative;
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

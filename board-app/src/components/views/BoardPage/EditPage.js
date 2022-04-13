import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

export default function EditPage() {
    const [form] = Form.useForm();
    const [postType, setPostType] = useState("free");
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState(location.state.post.title);
    const [content, setContent] = useState(location.state.post.content);
    let { id } = useParams();

    // console.log(location.state.post.title); //수정이니까 input안에 기존에 썼던 제목, 내용을 프론트에 보여주고 싶은데 어떻게 할까?
    const handleSelect = (e) => {
        setPostType(e.target.value);
    };

    const onFinishHandler = async (values) => {
        console.log(values);
        let newPost = {
            post_id: id, //수정할 게시글 찾기 위해서 post_id 넣어줌
            post_type: postType,
            title: title,
            content: content,
        };
        axios.post("/api/users/editpost", newPost).then((res) => {
            navigate("/board");
        });
    };
    const post = useSelector((state) => state.post.getPosts);

    const aa = (e) => {
        setTitle(e.target.value);
    };
    const bb = (e) => {
        setContent(e.target.value);
    };
    return (
        <AddDiv>
            <select onChange={handleSelect} value={postType}>
                <option key="free" value="free">
                    자유게시판
                </option>
                <option key="question" value="question">
                    질문게시판
                </option>
            </select>
            <Form form={form} name="editpost" onFinish={onFinishHandler}>
                <Form.Item
                    name="title"
                    // rules={[{ required: true, message: "제목을 입력하세요" }]}
                >
                    <TitleInput name="aaa" value={title} onChange={aa} />
                    {console.log("")}
                    {/* 왜 로그를 띄워야 업데이트가 되는거지? 그리고 antd에 value가 undefined 뜬다...*/}
                </Form.Item>
                <Form.Item
                    name="content"
                    // rules={[{ required: true, message: "내용을 입력하세요" }]}
                >
                    <Input.TextArea
                        rows={15}
                        showCount
                        size="large"
                        maxLength={1000}
                        value={content}
                        onChange={bb}
                    />
                    {console.log("")}
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{ float: "right" }}
                        type="primary"
                        htmlType="submit"
                    >
                        글쓰기
                    </Button>
                </Form.Item>
            </Form>
        </AddDiv>
    );
}

const AddDiv = styled(DefaultDiv)`
    width: 70%;
    margin: 0 auto;
    margin-top: 50px;
`;

const TitleInput = styled(Input)`
    height: 70px;
    font-size: 30px;
`;

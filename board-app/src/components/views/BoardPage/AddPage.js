import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { Form, Input, Button } from "antd";

export default function AddPage() {
    const [form] = Form.useForm();
    const [postType, setPostType] = useState("free");
    const user = useSelector((state) => state.user.userData);
    const navigate = useNavigate();

    const handleSelect = (e) => {
        setPostType(e.target.value);
    };

    console.log(postType);
    const onFinishHandler = async (values) => {
        let newPost = {
            post_type: postType,
            writer: user.name,
            email: user.email,
            title: values.title,
            content: values.content,
        };
        await axios.post("/api/users/add", newPost).then((res) => {
            navigate("/board");
        });
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
            <Form form={form} name="addpost" onFinish={onFinishHandler}>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: "제목을 입력하세요" }]}
                >
                    <TitleInput placeholder="제목" />
                </Form.Item>
                <Form.Item
                    name="content"
                    rules={[{ required: true, message: "내용을 입력하세요" }]}
                >
                    <Input.TextArea
                        rows={15}
                        placeholder="내용"
                        showCount
                        size="large"
                        maxLength={1000}
                    />
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

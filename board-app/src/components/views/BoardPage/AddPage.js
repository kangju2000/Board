import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { Form, Input, Button } from "antd";

export default function AddPage() {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user.userData);
    const navigate = useNavigate();

    const onFinishHandler = async (values) => {
        let newPost = {
            writer: user.name, // 유저가 이름 바꾸면 게시글의 name을 다 수정해야해서, id로 받는걸 추천
            title: values.title,
            content: values.content,
        };
        await axios.post("/api/users/add", newPost).then((res) => {
            navigate("/board");
        });
    };
    return (
        <AddDiv>
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

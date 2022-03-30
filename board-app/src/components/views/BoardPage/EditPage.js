import React from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { Form, Input, Button } from "antd";

export default function EditPage(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let { id } = useParams();
    console.log(location.state.title)
    const onFinishHandler = async (values) => {
        let newPost = {
            post_id: id,
            title: values.title,
            content: values.content,
        };
        axios.post("/api/users/editpost", newPost).then((res) => {
            navigate("/board");
        });
    };
    return (
        <AddDiv>
            <Form form={form} name="editpost" onFinish={onFinishHandler}>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: "제목을 입력하세요" }]}
                >
                    <TitleInput />
                </Form.Item>
                <Form.Item
                    name="content"
                    rules={[{ required: true, message: "내용을 입력하세요" }]}
                >
                    <Input.TextArea
                        rows={15}
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

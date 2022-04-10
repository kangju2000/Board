import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

export default function EditPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let { id } = useParams();

    // console.log(location.state.post.title); //수정이니까 input안에 기존에 썼던 제목, 내용을 프론트에 보여주고 싶은데 어떻게 할까?

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
    // const [title, setTitle] = useState({});
    // const [content, setContent] = useState({});
    // const aa = (e) => {
    //     setTitle({ [e.target.name]: e.target.value });
    // };
    // const bb = (e) => {
    //     setContent({ [e.target.name]: location.state.post.content });
    // };
    return (
        <AddDiv>
            <Form form={form} name="editpost" onFinish={onFinishHandler}>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: "제목을 입력하세요" }]}
                >
                    <TitleInput
                    // name="aaa" value={title} onChange={aa}
                    />
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
                        // value={content}
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

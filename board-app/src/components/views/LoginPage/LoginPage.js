import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import { Form, Input, Button, Checkbox } from "antd";

function LoginPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = (values) => {
        let user = {
            email: values.email,
            password: values.password,
        };
        dispatch(loginUser(user)).then((res) => {
            if (res.payload.loginSuccess) {
                navigate("/");
            } else {
                alert("Error");
            }
        });
    };
    return (
        <MainDiv>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmitHandler}
                autoComplete="off"
            >
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "이메일을 입력해주세요!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "비밀번호를 입력해주세요!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
            </Form>
        </MainDiv>
    );
}

export default LoginPage;

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

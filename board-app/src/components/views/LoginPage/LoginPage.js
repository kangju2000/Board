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
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </MainDiv>
    );
}

export default Auth(LoginPage, false);

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FormDiv = styled.form`
    display: flex;
    flex-direction: column;
`;

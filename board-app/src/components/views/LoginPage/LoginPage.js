import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { DefaultDiv, DefaultLink } from "../../../styles/styles";

export default function LoginPage() {
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
                alert("로그인에 실패했습니다.");
            }
        });
    };
    return (
        <MainDiv>
            <TitleDiv>
                <h1>로그인</h1>
            </TitleDiv>
            <LoginDiv>
                <Form
                    name="login"
                    size="large"
                    onFinish={onSubmitHandler}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "이메일을 입력해주세요!",
                            },
                        ]}
                    >
                        <Input placeholder="아이디" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "비밀번호를 입력해주세요!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="회원가입" />
                    </Form.Item>

                    <Form.Item>
                        <ButtonStyle type="primary" htmlType="submit">
                            로그인
                        </ButtonStyle>
                        <DefaultLink to="/register">
                            <ButtonStyle
                                style={{ width: "100%", marginBottom: "10px" }}
                            >
                                회원가입
                            </ButtonStyle>
                        </DefaultLink>
                    </Form.Item>
                </Form>
            </LoginDiv>
        </MainDiv>
    );
}

const MainDiv = styled(DefaultDiv)`
    text-align: center;
`;

const TitleDiv = styled.div`
    margin: 40px;
`;
const LoginDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const ButtonStyle = styled(Button)`
    width: 100%;
    margin-bottom: 10px;
`;

import React, { useCallback } from "react";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Modal } from "antd";

const { Option } = Select;
function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const validateEmail = useCallback((_, value) => {
        const regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!value.match(regExp)) {
            return Promise.reject(new Error("올바른 이메일 형식이 아닙니다."));
        }
        return Promise.resolve();
    }, []);

    const validatePassword = useCallback((_, value) => {
        const regExp =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (!regExp.test(value)) {
            return Promise.reject(
                new Error(
                    "비밀번호는 8~16자이며 영문/숫자/특수문자를 포함해야 합니다."
                )
            );
        }
        return Promise.resolve();
    }, []);

    const onFinishHandler = (values) => {
        console.log(values);
        let user = {
            name: values.name,
            email: values.email,
            password: values.password,
            gender: values.gender,
            intro: values.intro,
        };
        dispatch(RegisterUser(user)).then((res) => {
            if (res.payload.success) {
                navigate("/login");
            } else {
                alert("Error");
            }
        });
    };

    const success = () => {
        Modal.success({
            content: "some messages...some messages...",
        });
    };
    return (
        <MainDiv>
            <h1>회원가입</h1>
            <Form
                form={form}
                name="register"
                onFinish={onFinishHandler}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="이메일"
                    rules={[
                        {
                            required: true,
                            message: "이메일은 필수 항목입니다.",
                        },
                        { validator: validateEmail },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="비밀번호"
                    rules={[
                        {
                            required: true,
                            message: "비밀번호는 필수 항목입니다.",
                        },
                        { validator: validatePassword },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="비밀번호 확인"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "비밀번호를 확인해주세요!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error("비밀번호가 일치하지 않습니다.")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="닉네임"
                    tooltip="띄어쓰기도 가능합니다.(최대 8자)"
                    rules={[
                        {
                            required: true,
                            message: "닉네임을 적어주세요!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="성별"
                    rules={[
                        {
                            required: true,
                            message: "성별을 골라주세요!",
                        },
                    ]}
                >
                    <Select placeholder="성별을 골라주세요">
                        <Option value="male">남자</Option>
                        <Option value="female">여자</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="intro" label="자기 소개">
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </MainDiv>
    );
}

export default ProfilePage;

const MainDiv = styled(DefaultDiv)`
    padding: 30px;
    text-align: center;
    width: 500px;
    margin: 0 auto;
`;

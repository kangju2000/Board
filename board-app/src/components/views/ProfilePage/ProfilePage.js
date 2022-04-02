import React, { useCallback } from "react";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Modal } from "antd";
import axios from "axios";
import { auth } from "../../../_actions/user_action";

const { Option } = Select;
export default function ProfilePage() {
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

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
        let user = {
            email: userData.email,
            password: values.password,
            name: values.name,
            gender: values.gender,
            intro: values.intro,
        };
        axios.post("/api/users/profile", user).then((res) => {
            dispatch(auth()).then((res) => console.log(res));
            navigate("/board");
        });
    };

    return (
        <MainDiv>
            <h1>프로필 수정 페이지</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="profile"
                onFinish={onFinishHandler}
                size="large"
                scrollToFirstError
            >
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

                <ButtonStyle type="primary" size="large" htmlType="submit">
                    프로필 수정
                </ButtonStyle>
            </Form>
        </MainDiv>
    );
}

const MainDiv = styled(DefaultDiv)`
    padding: 30px;
    text-align: center;
    width: 100$;
`;

const ButtonStyle = styled(Button)`
    margin-top: 30px;
    width: 60%;
`;

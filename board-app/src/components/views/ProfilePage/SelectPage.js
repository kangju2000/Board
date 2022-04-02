import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { DefaultDiv } from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import axios from "axios";
import { auth } from "../../../_actions/user_action";

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
const { Option } = Select;
function SelectPage() {
    const [PwdForm, SetpwdForm] = useState(false);
    const [ProfileForm, SetprofileForm] = useState(false);
    const userData = useSelector((state) => state.user.userData);

    return (
        <DefaultDiv>
            <SelectDiv>
                <SelectBtn
                    type="primary"
                    onClick={() => {
                        SetprofileForm(false);
                        SetpwdForm(true);
                    }}
                >
                    비밀번호 변경
                </SelectBtn>
                <SelectBtn
                    type="primary"
                    onClick={() => {
                        SetpwdForm(false);
                        SetprofileForm(true);
                    }}
                >
                    프로필 변경
                </SelectBtn>
            </SelectDiv>
            {PwdForm === true ? <PwdDiv userData={userData} /> : null}
            {ProfileForm === true ? <ProfileDiv userData={userData} /> : null}
        </DefaultDiv>
    );
}
const PwdDiv = (props) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const onPwdFinishHandler = (values) => {
        let user = {
            email: props.userData.email,
            password: values.password,
        };
        axios.post("/api/users/profile", user).then((res) => {
            dispatch(auth()).then((res) => console.log(res));
            navigate("/board");
        });
    };
    return (
        <PwdFormDiv>
            <Form
                {...formItemLayout}
                form={form}
                name="profile"
                onFinish={onPwdFinishHandler}
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
                <SubmitBtn type="primary" size="large" htmlType="submit">
                    프로필 수정
                </SubmitBtn>
            </Form>
        </PwdFormDiv>
    );
};

const ProfileDiv = (props) => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onProfileFinishHandler = (values) => {
        let user = {
            email: props.userData.email,
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
        <ProfileFormDiv>
            <Form
                {...formItemLayout}
                form={form}
                name="profile"
                onFinish={onProfileFinishHandler}
                size="large"
                scrollToFirstError
            >
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

                <SubmitBtn type="primary" size="large" htmlType="submit">
                    프로필 수정
                </SubmitBtn>
            </Form>
        </ProfileFormDiv>
    );
};

const SelectDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;
const SelectBtn = styled(Button)`
    width: 30%;
    max-width: 300px;
    height: 100px;
    margin-right: 30px;
    font-size: 30px;
`;

const PwdFormDiv = styled.div`
    padding: 30px;
    text-align: center;
`;
const ProfileFormDiv = styled.div`
    padding: 30px;
    text-align: center;
`;
const SubmitBtn = styled(Button)`
    width: 70%;
`;

export default SelectPage;

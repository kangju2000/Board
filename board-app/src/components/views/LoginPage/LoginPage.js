import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, userDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onPwdHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let user = {
            email: Email,
            password: Password,
        };

        dispatch(loginUser(user)).then((res) => {
            if (res.payload.loginSuccess) {
                navigate(-1);
            } else {
                alert("Error");
            }
        });
    };
    return (
        <MainDiv>
            <FormDiv onSubmit={onSubmitHandler}>
                <label>이메일</label>
                <input
                    type="email"
                    value={Email}
                    placeholder="이메일"
                    onChange={onEmailHandler}
                />

                <label>비밀번호</label>
                <input
                    type="password"
                    value={Password}
                    placeholder="비밀번호"
                    onChange={onPwdHandler}
                />
                <button>로그인</button>
            </FormDiv>
        </MainDiv>
    );
}
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

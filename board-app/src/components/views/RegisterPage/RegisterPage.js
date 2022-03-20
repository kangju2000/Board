import React, { useState } from "react";
import styled from "styled-components";
import { BodyColor, ButtonColor, DefaultDiv } from "../../../styles/styles";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

function RegisterPage() {
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
        console.log(user);

        dispatch(RegisterUser(user)).then((res) => {
            if (res.payload.success) {
                navigate('/login');
            } else {
                alert("Error");
            }
        });
    };
    return (
        <MainDiv>
            <div>
                <h1>회원가입</h1>
                <RegisterDiv>
                    <FormDiv onSubmit={onSubmitHandler}>
                        <Input
                            type="email"
                            value={Email}
                            placeholder="Email"
                            onChange={onEmailHandler}
                        />
                        <Input
                            type="password"
                            value={Password}
                            placeholder="Password"
                            onChange={onPwdHandler}
                        />
                        <Button>회원가입</Button>
                    </FormDiv>
                </RegisterDiv>
            </div>
        </MainDiv>
    );
}

export default Auth(RegisterPage, false);

const MainDiv = styled(DefaultDiv)`
    padding: 30px;
    text-align: center;
`;

const FormDiv = styled.form`
    width: 500px;
    margin: 0 auto;
`;

const RegisterDiv = styled.div``;

const Input = styled.input`
    display: block;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin-bottom: 5px;
    &:focus {
        outline: none;
    }
`;
const Button = styled.button`
    width: 100%;
    background-color: ${ButtonColor};
    border: none;
    border-radius: 5px;
`;

import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export default function Login() {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");


    return (
        <Empty className="container">
            <h1>로그인</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Empty>
    );
}

const Empty = styled.div`
    margin-top: 50px;
`;

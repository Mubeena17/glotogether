import { useState } from "react";
import { Button, Form, Container, Stack } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

export const Auth = {
    loginUser: (email, password) => {
        //handle in server
        //setcookies in server
        let user = {
            email,
            password,
        };

        const myform = document.getElementById("form-login");

        if (!myform.checkValidity()) {
            //error message here
            return;
        }
        console.log("form data", user);
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("response ", response);
                if (response.status === 200) {
                    location.reload();
                    return true;
                } else throw Error("Something went wrong");
            })
            .catch((err) => {
                console.log(err.message);
                return false;
            });
    },
    logout: () => {
        //remove cookies in server
    },
};

function Login() {
    const [loginState, setLoginState] = useState({
        email: "",
        password: "",
    });

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log("email is ", loginState.email);
        if (Auth.loginUser(loginState.email, loginState.password)) {
            return true;
        } else {
            // display error
            return false;
        }
    };

    return (
        <Container fluid="sm">
            <Stack
                gap={2}
                className="col-md-5 mx-auto justify-content-center fullvh"
            >
                <Form id="form-login">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(event) => {
                                const { value } = event.target;
                                setLoginState({ ...loginState, email: value });
                            }}
                        />
                        <Form.Text className="text-muted">
                            We`ll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                const { value } = event.target;
                                setLoginState({
                                    ...loginState,
                                    password: value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Check me out"
                            onChange={(event) => {
                                const value = event.target.checked;
                                setLoginState({
                                    ...loginState,
                                    checkMeOut: value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!loginState.email || !loginState.password}
                        onClick={handleSumbit}
                    >
                        Submit
                    </Button>
                </Form>
            </Stack>
        </Container>
    );
}

export default Login;

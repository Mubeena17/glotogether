import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Container, Stack } from "react-bootstrap";
import { Reset } from "../utlis/resetpassword";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

function ResetPassword() {
    const [resetState, setResetState] = useState({
        view: 1,
        email: "",
        code: "",
        NewPassword: "",
    });
    const handleSumbitEmail = () => {
        // return Reset.registerUser(
        //     registrationState.email,
        //     registrationState.password,
        //     registrationState.firstname,
        //     registrationState.lastname
        // ).then((res) => {
        //     if (res) {
        //         location.reload();
        //     }
        // });

        setResetState({ ...resetState, view: 2 });
    };
    const handleSumbitPassword = () => {
        setResetState({ ...resetState, view: 3 });
    };
    const currentview = () => {
        switch (resetState.view) {
            case 1:
                return (
                    <Container fluid="sm">
                        <Stack
                            gap={2}
                            className="col-md-5 mx-auto justify-content-center fullvh"
                        >
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setResetState({
                                                ...resetState,
                                                email: value,
                                            });
                                        }}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    disabled={!resetState.email}
                                    onClick={handleSumbitEmail}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Stack>
                    </Container>
                );

            case 2:
                return (
                    <Container fluid="sm">
                        <Stack
                            gap={2}
                            className="col-md-5 mx-auto justify-content-center fullvh"
                        >
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formResetCode"
                                >
                                    <Form.Label>Reset Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Reset Code"
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setResetState({
                                                ...resetState,
                                                code: value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formResetPassword"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setResetState({
                                                ...resetState,
                                                newPassword: value,
                                            });
                                        }}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    disabled={
                                        !resetState.code ||
                                        !resetState.newPassword
                                    }
                                    onClick={handleSumbitPassword}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Stack>
                    </Container>
                );

            case 3:
                return (
                    <Container fluid="sm">
                        <Stack
                            gap={2}
                            className="col-md-5 mx-auto justify-content-center fullvh"
                        >
                            <div className="p-5 text-center bg-light">
                                <h1 className="mb-3">Reset Password</h1>
                                <h4 className="mb-3">Success</h4>
                                <Link to="/login">Click here to Log in!</Link>
                            </div>
                        </Stack>
                    </Container>
                );
        }
    };

    return <>{currentview()}</>;
}

export default ResetPassword;

const start = () => {
    return (
        <Container fluid="sm">
            <Stack
                gap={2}
                className="col-md-5 mx-auto justify-content-center fullvh"
            >
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(event) => {
                                const { value } = event.target;
                                setResetState({ ...resetState, email: value });
                            }}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        disabled={!resetState.email}
                        onClick={handleSumbit}
                    >
                        Submit
                    </Button>
                </Form>
            </Stack>
        </Container>
    );
};

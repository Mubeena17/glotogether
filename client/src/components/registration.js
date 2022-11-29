import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Container, Stack } from "react-bootstrap";
import { Auth } from "../utlis/auth";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

function Registration() {
    const [registrationState, setRegistrationState] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
    });

    const handleSumbit = () => {
        return Auth.registerUser(
            registrationState.email,
            registrationState.password,
            registrationState.firstname,
            registrationState.lastname
        ).then((res) => {
            if (res) {
                location.reload();
            }
        });
    };

    return (
        <Container fluid="sm">
            <Stack
                gap={2}
                className="col-md-5 mx-auto justify-content-center fullvh"
            >
                <Form id="form-registration">
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            onChange={(event) => {
                                const { value } = event.target;
                                setRegistrationState({
                                    ...registrationState,
                                    firstname: value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            onChange={(event) => {
                                const { value } = event.target;
                                setRegistrationState({
                                    ...registrationState,
                                    lastname: value,
                                });
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(event) => {
                                const { value } = event.target;
                                setRegistrationState({
                                    ...registrationState,
                                    email: value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                const { value } = event.target;
                                setRegistrationState({
                                    ...registrationState,
                                    password: value,
                                });
                            }}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        disabled={
                            !registrationState.email ||
                            !registrationState.password ||
                            !registrationState.firstname ||
                            !registrationState.lastname
                        }
                        onClick={handleSumbit}
                    >
                        Submit
                    </Button>
                </Form>
                <Link to="/login">Click here to Log in!</Link>
            </Stack>
        </Container>
    );
}

export default Registration;

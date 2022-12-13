import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Button,
    Container,
    Card,
    Image,
    Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Onlineuser() {
    const onlineuser = useSelector((state) => state.onlineuser);
    const [filteredUsers, setFilteredUsers] = useState();

    useEffect(() => {
        if (onlineuser) {
            fetch("/user/id.json")
                .then((result) => result.json())
                .then((user) => {
                    setFilteredUsers(
                        onlineuser.filter((item) => {
                            return item.id != user.user_id;
                        })
                    );
                });
        }
    }, [onlineuser]);

    if (!filteredUsers)
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );

    return (
        <Container style={{ paddingTop: "50px" }}>
            <h1> Online</h1>
            <Row>
                {filteredUsers.map((user) => (
                    <Col md="3" key={user.id} className="mb-3">
                        <Card
                            style={{
                                borderRadius: "15px",
                                backgroundColor: "Lightgrey",
                            }}
                        >
                            <Card.Body className="text-center">
                                <Image
                                    src={
                                        user.profileurl || "images/profile.png"
                                    }
                                    alt="avatar"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                    fluid
                                />
                                <p className="text-muted mb-1">
                                    {user.firstname} {user.lastname}
                                </p>

                                <div className="d-grid gap-2">
                                    <Button>Chat</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

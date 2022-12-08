import React from "react";
import {
    Card,
    Row,
    Col,
    Image,
    Container,
    Form,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Friendship } from "../utlis/friendship";
import { useSelector, useDispatch } from "react-redux";
import { received, decline, accept } from "../redux/friendslice";

export default function Friends() {
    const friendList = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => friend.accepted)
    );

    const friendRequest = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => !friend.accepted)
    );

    const dispatch = useDispatch();

    const getFriendList = async () => {
        let responseJSON = await fetch("/myfriendlist");
        let response = await responseJSON.json();
        console.log(response.data);
        dispatch(received(response.data));
    };

    const handleDecline = async (id) => {
        let method = "DELETE";
        let response = await Friendship.sendFriendrequest(id, method);
        if (response.status) {
            const action = decline(id);
            dispatch(action);
        }
    };

    const handleAccept = async (id) => {
        let response = await Friendship.sendFriendrequest(id, "PUT");
        if (response.status) {
            let user = response.user;
            const action = accept(user.sender_id);
            dispatch(action);
        }
    };

    useEffect(() => {
        getFriendList();
    }, []);

    return (
        <div style={{ paddingTop: "50px" }}>
            <h1> My friends </h1>
            <Row>
                {friendList.map((user) => (
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
                                    <Button
                                        onClick={() => handleDecline(user.id)}
                                    >
                                        Unfriend
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h1> New request </h1>
            <Row style={{ paddingTop: "10px" }}>
                {friendRequest.map((user) => (
                    <Col md="3" key={user.id} className="mb-3">
                        <Card
                            style={{
                                borderRadius: "15px",
                                backgroundColor: "Lightgrey",
                            }}
                        >
                            <Card.Body className="text-center">
                                <Image
                                    src={user.profileurl}
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

                                <div className="d-flex justify-content-center mb-2">
                                    <Button
                                        onClick={() => handleAccept(user.id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        className="ms-1"
                                        onClick={() => handleDecline(user.id)}
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

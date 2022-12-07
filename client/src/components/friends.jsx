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

import { useSelector, useDispatch } from "react-redux";
import { populateFriendList } from "../redux/friendslice";

export default function Friends() {
    const friendList = useSelector((state) =>
        state.friends.filter((friend) => friend.accepted)
    );

    const friendRequest = useSelector((state) =>
        state.friends.filter((friend) => !friend.accepted)
    );

    const dispatch = useDispatch();

    const getList = async () => {
        let responseJSON = await fetch("/myfriendlist");

        let response = await responseJSON.json();

        dispatch(populateFriendList(response.data));
    };
    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <Row>
                {friendList.map((user) => (
                    <Col md="5" key={user.id} className="mb-3">
                        <Card
                            style={{
                                borderRadius: "15px",
                                backgroundColor: "Lightgrey",
                            }}
                        >
                            <Card.Body className="p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                        <Image
                                            style={{
                                                width: "180px",
                                                height: "180px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                            }}
                                            src={
                                                user.profileurl ||
                                                "/images/profile.png"
                                            }
                                            alt="Generic placeholder image"
                                            fluid
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <Card.Title>
                                            {user.firstname} {user.lastname}
                                        </Card.Title>

                                        <Card.Text>{user.bio}</Card.Text>

                                        <div
                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                            style={{
                                                backgroundColor: "#efefef",
                                            }}
                                        >
                                            <div>
                                                <p className="small text-muted mb-1">
                                                    Articles
                                                </p>
                                                <p className="mb-0">41</p>
                                            </div>
                                            <div className="px-3">
                                                <p className="small text-muted mb-1">
                                                    Followers
                                                </p>
                                                <p className="mb-0">976</p>
                                            </div>
                                            <div>
                                                <p className="small text-muted mb-1">
                                                    Rating
                                                </p>
                                                <p className="mb-0">8.5</p>
                                            </div>
                                        </div>
                                        <div className="d-flex pt-1">
                                            <Button className="me-1 flex-grow-1">
                                                Check profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div> New request </div>
            <Row>
                {friendRequest.map((user) => (
                    <div key={user.id}>
                        {user.firstname} {user.lastname}
                    </div>
                ))}
            </Row>
        </>
    );
}

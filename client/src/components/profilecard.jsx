import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Profilecard(props) {
    let { user } = props;
    const navigate = useNavigate();
    const handleButton = () => {
        navigate(`/otherprofile/${user.id}`);
    };
    return (
        <Col md="5" className="mb-3">
            <Card
                key={user.id}
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
                                src={user.profileurl || "/images/profile.png"}
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
                                <Button
                                    className="me-1 flex-grow-1"
                                    onClick={handleButton}
                                >
                                    Check profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

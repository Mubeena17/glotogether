import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, newMessage } from "../redux/chatslice";
import {
    Row,
    Col,
    Form,
    Button,
    Card,
    Image,
    Container,
} from "react-bootstrap";
import { socket } from "../socket";
const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);

    const chatRef = useRef(null);

    useEffect(() => {
        socket.on("message", (message) => {
            dispatch(getMessage(message));
        });
    }, [dispatch]);

    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: "smooth" });
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        socket.emit("message", message);
        e.target.message.value = "";
    };
    return (
        <Container className="mt-5">
            <Row>
                <Col md="12">
                    <Card
                        id="chat3"
                        style={{
                            borderRadius: "15px",
                        }}
                    >
                        <Card.Body>
                            <Col
                                style={{
                                    maxHeight: "500px",
                                    overflowY: "scroll",
                                }}
                                ref={chatRef}
                            >
                                {messages.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="d-flex flex-row justify-content-start"
                                        >
                                            <Image
                                                rounded
                                                src={item.profileurl}
                                                alt={item.id}
                                                style={{
                                                    width: "45px",
                                                    height: "100%",
                                                }}
                                            />
                                            <div>
                                                <p
                                                    className="large p-3 ms-3 mb-1 rounded-3"
                                                    style={{
                                                        backgroundColor:
                                                            "#f5f6f7",
                                                    }}
                                                >
                                                    {item.text}
                                                </p>
                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-start">
                                                    by {item.firstname}{" "}
                                                    {item.lastname}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* <div className="d-flex flex-row justify-content-end">
                                        <div>
                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat.
                                            </p>
                                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="avatar 1"
                                            style={{
                                                width: "45px",
                                                height: "100%",
                                            }}
                                        />
                                    </div> */}
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="large p-3 rounded-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" name="message" />
                        </Form.Group>
                        <Button className="mt-3" type="submit">
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
export default Chat;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, newMessage } from "../redux/chatslice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { socket } from "../socket";
const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    useEffect(() => {
        socket.on("message", (message) => {
            dispatch(getMessage(message));
        });
    }, [dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        socket.emit("message", message);
        // dispatch(newMessage(message));
        e.target.message.value = "";
    };
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Chat</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" name="message" />
                        </Form.Group>
                        <Button type="submit">Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
export default Chat;

import { useEffect, useState } from "react";
import { Find } from "../utlis/find";
import { Card, Row, Col, Image, Container, Form } from "react-bootstrap";

export default function Findpeople() {
    const [userList, setUserList] = useState([]);
    const [queryState, setQueryState] = useState("");

    useEffect(() => {
        Find.getUserList(queryState).then((user) => {
            if (user.length > 0) {
                // setUserList((existingUsers) => [...existingUsers, ...user]);
                setUserList([...user]);
            } else {
                setUserList([]);
            }
        });
    }, [queryState]);

    return (
        <div className="d-grid gap-4">
            <Form>
                <Form.Group className="mb-3 col-md-5" controlId="formSearch">
                    <Form.Label>Looking someone particular</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        onChange={(event) => {
                            const { value } = event.target;
                            setQueryState(value);
                        }}
                    />
                </Form.Group>
            </Form>
            <h1>Find people</h1>
            {queryState == "" ? <h2>Checkout who just joined</h2> : ""}
            {queryState.length > 0 && userList.length == 0 && (
                <h2>No user exixst </h2>
            )}
            {userList.map((user) => (
                <Card key={user.id} style={{ width: "20rem" }}>
                    <Card.Body>
                        <Container>
                            <Card.Link href={`/otherprofile/${user.id}`}>
                                <Row>
                                    <Col>
                                        <Image
                                            height="100px"
                                            src={
                                                user.profileurl ||
                                                "/images/profile.png"
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Card.Title>
                                            {user.firstname}
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Link>
                        </Container>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

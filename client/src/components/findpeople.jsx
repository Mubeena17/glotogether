import { useEffect, useState } from "react";
import { Find } from "../utlis/find";
import { Card, Row, Col, Image, Container, Form } from "react-bootstrap";
import Profilecard from "./profilecard";

export default function Findpeople() {
    const [userList, setUserList] = useState([]);
    const [queryState, setQueryState] = useState("");

    const getUserList = async () => {
        let user = await Find.getUserList(queryState);
        if (user.length > 0) {
            // setUserList((existingUsers) => [...existingUsers, ...user]);
            setUserList([...user]);
        } else {
            setUserList([]);
        }
    };

    useEffect(() => {
        getUserList();
    }, [queryState]);

    return (
        <div>
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
            <Row>
                {userList.map((user) => (
                    <Profilecard key={user.id} user={user} />
                ))}
            </Row>
        </div>
    );
}

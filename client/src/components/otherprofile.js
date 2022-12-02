import { useState, useEffect } from "react";
import Profilepic from "./profilepic";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

export default function Otherprofile() {
    const { id } = useParams();
    const [userState, setUserState] = useState({});
    const navigate = useNavigate();

    //componentDidmount
    useEffect(() => {
        fetch(`/user/${id}`)
            .then((userinfo) => {
                return userinfo.json();
            })
            .then((data) => {
                if (data.self) {
                    navigate("/");
                } else if (Object.keys(data.user).length == 0) {
                    navigate("/", { replace: true });
                } else {
                    setUserState(data.user);
                }
            });
    }, [id]);

    return (
        <Row>
            <Col sm={3}>
                <Profilepic src={userState.profileurl} size={"large"} />
            </Col>
            <Col sm={4}>
                <h1>
                    {userState.firstname}
                    <span></span>
                    {userState.lastname}
                </h1>
                <div> {userState.bio || "No bio"}</div>
            </Col>
        </Row>
    );
}

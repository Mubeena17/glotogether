import { useState, useEffect } from "react";
import Profilepic from "./profilepic";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

export default function Otherprofile() {
    const { id } = useParams();
    const [userState, setUserState] = useState({});
    const navigate = useNavigate();

    const getUserInfo = async () => {
        let userinfo = await fetch(`/user/${id}`);
        let data = await userinfo.json();
        if (data.self) {
            navigate("/");
        } else if (Object.keys(data.user).length == 0) {
            navigate("/", { replace: true });
        } else {
            setUserState(data.user);
        }
    };

    //componentDidmount
    useEffect(() => {
        getUserInfo();
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

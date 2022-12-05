import { useState, useEffect } from "react";
import Profilepic from "./profilepic";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { Friendship } from "../utlis/friendship";

export default function Otherprofile() {
    const { id } = useParams();
    const [userState, setUserState] = useState({});
    const navigate = useNavigate();
    const [friendshipState, setFriendshipState] = useState(false);
    const [isAccepted, setisAccepted] = useState(false);
    const [amIsender, setIamSender] = useState(false);

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
    const getFriendshipInfo = async () => {
        let response = await Friendship.getStatus(id);
        console.log("%%%RESPONSE%%% ", response);
        //0 rows

        setFriendshipState(response.status);
        setisAccepted(response.isAccepted);
        setIamSender(response.amIsender);

        console.log("STATE", friendshipState, isAccepted, amIsender);
    };

    const handleSendFriendRequest = async () => {
        let response = await Friendship.sendFriendrequest(id, "POST");
        if (response.status) {
            setFriendshipState(response.status);
        }
    };
    const handleAcceptFriendRequest = async () => {
        let response = await Friendship.sendFriendrequest(id, "PUT");
        console.log("Hello res", response);
        setFriendshipState(response.status);
        setisAccepted(response.isAccepted);
        setIamSender(response.amIsender);
    };

    const handleDeleteRequest = async () => {
        let method = "DELETE";
        let response = await Friendship.sendFriendrequest(id, method);
        if (response.status) {
            setFriendshipState(false);
        }
    };

    //componentDidmount
    useEffect(() => {
        getUserInfo();
        getFriendshipInfo();
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
                {!friendshipState && (
                    <Button onClick={handleSendFriendRequest}>
                        Send Request
                    </Button>
                )}
                {friendshipState && !isAccepted && amIsender && (
                    <Button onClick={handleDeleteRequest}>
                        Cancel Request
                    </Button>
                )}

                {friendshipState && !amIsender && !isAccepted && (
                    <>
                        <Button onClick={handleAcceptFriendRequest}>
                            Accept
                        </Button>
                        <Button onClick={handleDeleteRequest}>Decline</Button>
                    </>
                )}
                {friendshipState && isAccepted && (
                    <Button onClick={handleDeleteRequest}>Unfriend</Button>
                )}
            </Col>
        </Row>
    );
}

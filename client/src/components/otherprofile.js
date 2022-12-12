import { useState, useEffect } from "react";
import Profilepic from "./profilepic";
import { Row, Col, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { Friendship } from "../utlis/friendship";
import Friendbutton from "./friendbutton";
import { socket } from "../socket";

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

        setFriendshipState(response.status);
        setisAccepted(response.isAccepted);
        setIamSender(response.amIsender);

        console.log("STATE", friendshipState, isAccepted, amIsender);
    };

    const handleSendFriendRequest = async () => {
        let response = await Friendship.sendFriendrequest(id, "POST");
        if (response.status) {
            setFriendshipState(response.status);
            socket.emit("Friendrequest", id);
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
        <Container className="mt-5">
            <Row>
                <Col md={3}>
                    <Profilepic
                        src={userState.profileurl || "/images/profile.png"}
                        size={"large"}
                    />
                </Col>
                <Col md={4}>
                    <h1>
                        {userState.firstname}
                        <span></span>
                        {userState.lastname}
                    </h1>
                    <div> {userState.bio || "No bio"}</div>
                    {!friendshipState && (
                        <Friendbutton
                            text="Send Request"
                            onClick={handleSendFriendRequest}
                        ></Friendbutton>
                    )}
                    {friendshipState && !isAccepted && amIsender && (
                        <Friendbutton
                            text="Cancel Request"
                            onClick={handleDeleteRequest}
                        ></Friendbutton>
                    )}

                    {friendshipState && !amIsender && !isAccepted && (
                        <>
                            <Friendbutton
                                text="Accept"
                                onClick={handleAcceptFriendRequest}
                            ></Friendbutton>
                            <Friendbutton
                                className="ms-2"
                                text="Decline"
                                onClick={handleDeleteRequest}
                            ></Friendbutton>
                        </>
                    )}
                    {friendshipState && isAccepted && (
                        <Friendbutton
                            text="Unfriend"
                            onClick={handleDeleteRequest}
                        ></Friendbutton>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

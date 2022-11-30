import Logo from "./logo";
import Profilepic from "./profilepic";
import Profile from "./profile";
import Uploadmodal from "./uploadmodal";
import { useEffect, useState } from "react";
import { Button, Modal, Stack, Form, Row, Col } from "react-bootstrap";

function App(props) {
    const [userState, userSetState] = useState({
        user: {},
        profileurl: "/images/profile.png",
        bio: "",
    });
    //modal state
    const [show, setShow] = useState(false);
    // modal close and open
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeprofile = (profileurl) => {
        userSetState({
            ...userState,
            profileurl: profileurl,
        });
    };

    const bioUpdated = (biotext) => {
        userSetState({
            ...userState,
            bio: biotext,
        });
    };

    //componentDidmount
    useEffect(() => {
        fetch(`/user/info/${props.id}`)
            .then((userinfo) => userinfo.json())
            .then((user) => {
                userSetState({
                    ...userState,
                    user: user,
                    profileurl: user.profileurl || userState.profileurl,
                });
            });
    }, [props.id]);

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <div className="me-auto">
                    <Logo />
                </div>
                <Profilepic
                    src={userState.profileurl}
                    onShow={handleShow}
                    user={userState.user}
                />
            </Stack>
            <div>
                <Profile
                    src={userState.profileurl}
                    user={userState.user}
                    bio={userState.bio}
                    bioUpdated={bioUpdated}
                />
            </div>
            <Uploadmodal
                show={show}
                change={changeprofile}
                onHide={handleClose}
                user={userState.user}
            />
        </>
    );
}

export default App;

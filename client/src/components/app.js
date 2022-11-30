import Logo from "./logo";
import Profilepic from "./profilepic";
import Uploadmodal from "./uploadmodal";
import { useEffect, useState } from "react";
import { Button, Modal, Stack, Form } from "react-bootstrap";

function App(props) {
    const [userState, userSetState] = useState({
        user: {},
        profileurl: "/images/profile.png",
    });
    //modal state
    const [show, setShow] = useState(false);
    // modal close and open
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeprofile = (profileurl) => {
        console.log("WERWEWR", profileurl);
        userSetState({
            ...userState,
            profileurl: profileurl,
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

import Logo from "./logo";
import Profilepic from "./profilepic";
import Uploadmodal from "./uploadmodal";
import { useEffect, useState } from "react";
import { Button, Modal, Stack, Form } from "react-bootstrap";

function App(props) {
    const [userState, userSetState] = useState({
        user: {},
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //componentDidmount
    useEffect(() => {
        fetch(`/user/info/${props.id}`)
            .then((userinfo) => userinfo.json())
            .then((user) => {
                userSetState({
                    ...userState,
                    user: user,
                });
            });
    }, [props.id]);

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <div className="me-auto">
                    <Logo />
                </div>
                <Profilepic onShow={handleShow} user={userState.user} />
            </Stack>
            <Uploadmodal show={show} onHide={handleClose} />
        </>
    );
}

export default App;

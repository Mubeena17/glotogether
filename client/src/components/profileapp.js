import Logo from "./logo";
import Profilepic from "./profilepic";
import Profile from "./profile";
import Uploadmodal from "./uploadmodal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

export default function ProfileApp(props) {
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
        console.log("BIO TEXT ", biotext);
        userSetState((userState) => ({
            ...userState,
            bio: biotext,
        }));
    };

    const getInfo = async () => {
        let userinfo = await fetch(`/user/info/${props.id}`);
        let user = await userinfo.json();
        if (user)
            userSetState({
                ...userState,
                user: user,
                bio: user.bio,
                profileurl: user.profileurl || userState.profileurl,
            });
    };

    //componentDidmount
    useEffect(() => {
        getInfo();
    }, [props.id]);

    console.log(userState);
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <div className="me-auto">
                    <Logo />
                </div>
                <Link to="/find">Find people</Link>
                <Link to="/random">Random</Link>
                <Link to="/friends">My Friends</Link>
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

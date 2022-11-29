import Logo from "./logo";
import { useEffect, useState } from "react";

function App(props) {
    const [userState, userSetState] = useState({
        user: {},
    });

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
            <Logo />
        </>
    );
}

export default App;

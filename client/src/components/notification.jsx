import React from "react";
import Toast from "react-bootstrap/Toast";
import { useDispatch, useSelector } from "react-redux";
import { showToast, hideToast } from "../redux/notificationslice";

function Notification() {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.notification.show);
    const data = useSelector((state) => state.notification.data);

    const toggleShow = () => dispatch(hideToast());

    return (
        <div style={{ zIndex: 100, position: "absolute", right: 0, top: 20 }}>
            <Toast show={show} onClose={toggleShow}>
                <Toast.Header>
                    <img
                        src="/images/logo.png"
                        className="rounded me-2"
                        alt=""
                        height="20px"
                        width="20px"
                    />
                    <strong className="me-auto">Glo Together</strong>
                </Toast.Header>
                <Toast.Body>{data}</Toast.Body>
            </Toast>
        </div>
    );
}

export default Notification;

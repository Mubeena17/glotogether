import { io } from "socket.io-client";
import { getMessage, newMessage } from "./redux/chatslice";
import { showToast, hideToast } from "./redux/notificationslice";
import { received } from "./redux/onlineuserslice";

export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessage", (data) => {
            if (data) {
                store.dispatch(getMessage(data));
            }
        });

        socket.on("newMessage", (data) => {
            console.log("here the data ", data);
            store.dispatch(newMessage(data));
        });

        socket.on("newRequest", (data) => {
            console.log(data);
            store.dispatch(showToast(data));

            setTimeout(() => {
                store.dispatch(hideToast());
            }, "4000");
        });

        socket.on("onlineuser", (data) => {
            console.log("data onloine", data);
            store.dispatch(received(data));
        });
    }
};

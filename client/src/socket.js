import { io } from "socket.io-client";
import { getMessage, newMessage } from "./redux/chatslice";

export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessage", (data) => {
            if (data) {
                store.dispatch(getMessage(data));
            }
        });

        socket.on("newMessage", (data) => store.dispatch(newMessage(data)));
    }
};

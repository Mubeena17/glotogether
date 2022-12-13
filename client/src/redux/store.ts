import {
    configureStore,
    createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
//import { createLogger } from "redux-logger";
import counterReducer from "./counterslice";
import friendReducer from "./friendslice";
import chatReducer from "./chatslice";
import notificationReducer from "./notificationslice";
import onlineuserReducer from "./onlineuserslice";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware(
    {}
);

const middleware = [immutableInvariantMiddleware, thunkMiddleware];
if (process.env.NODE_ENV === "development") {
    // middleware.push(createLogger());
}
const store = configureStore({
    reducer: {
        counter: counterReducer,
        friends: friendReducer,
        chat: chatReducer,
        notification: notificationReducer,
        onlineuser: onlineuserReducer,
    },
    middleware: [immutableInvariantMiddleware, thunkMiddleware],
});

export type Statetype = {
    friends: {
        friends: {
            id: number;
            firstname: string;
            accepted: boolean;
            lastname: string;
            profileurl: string;
        }[];
    };
    chat: {
        message: {
            id: number;
            firstname: string;
            lastname: string;
            profileurl: string;
            text: string;
        }[];
    };
    notification: {
        toast: {
            show: boolean;
            data: string;
        };
    };
    onlineuser: {
        onlineuser: {
            id: number;
            firstname: string;
            lastname: string;
            profileurl: string;
        }[];
    };
};
export default store;

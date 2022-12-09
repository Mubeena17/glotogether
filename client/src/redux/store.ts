import {
    configureStore,
    createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
//import { createLogger } from "redux-logger";
import bioReducer from "./bioSlice";
import counterReducer from "./counterslice";
import friendReducer from "./friendslice";
import chatReducer from "./chatslice";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware(
    {}
);

const middleware = [immutableInvariantMiddleware, thunkMiddleware];
if (process.env.NODE_ENV === "development") {
    // middleware.push(createLogger());
}
const store = configureStore({
    reducer: {
        bio: bioReducer,
        counter: counterReducer,
        friends: friendReducer,
        chat: chatReducer,
    },
    middleware: [immutableInvariantMiddleware, thunkMiddleware],
});

export type Statetype = {
    bio: {
        biotext: string;
    };
    counter: {
        counter: number;
    };
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
        message: [string];
    };
};
export default store;

import {
    configureStore,
    createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import bioReducer from "./bioSlice";
import counterReducer from "./counterslice";
import friendReducer from "./friendslice";

// const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
//     ignoredPaths: ["ignoredPath", "ignoredNested.one", "ignoredNested.two"],
// });

const store = configureStore({
    reducer: {
        bio: bioReducer,
        counter: counterReducer,
        friends: friendReducer,
    },
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
};
export default store;

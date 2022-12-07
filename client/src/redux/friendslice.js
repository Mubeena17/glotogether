import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const friendslice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        populateFriendList(state, { payload }) {
            return [...state, ...payload];
        },
    },
});

export const { populateFriendList } = friendslice.actions;
export default friendslice.reducer;

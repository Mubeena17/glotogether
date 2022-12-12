import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const onlineuserslice = createSlice({
    name: "onlineusers",
    initialState,
    reducers: {
        received(state, { payload }) {
            return [...payload];
        },
    },
});

export const { received } = onlineuserslice.actions;
export default onlineuserslice.reducer;

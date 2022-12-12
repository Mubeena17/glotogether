import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const onlineuserslice = createSlice({
    name: "onlineusers",
    initialState,
    reducers: {
        online(state, { payload }) {
            return [...payload];
        },
        offline(state, { payload }) {
            let updatedonlineList = state.filter((item) => {
                return item.id != payload;
            });
            return updatedonlineList;
        },
    },
});

export const { online, offline } = onlineuserslice.actions;
export default onlineuserslice.reducer;

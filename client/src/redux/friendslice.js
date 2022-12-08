import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const friendslice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        received(state, { payload }) {
            return [...state, ...payload];
        },
        decline(state, { payload }) {
            console.log(payload);
            let updatedFriendList = state.filter((item) => {
                return item.id != payload;
            });
            return updatedFriendList;
        },
        accept(state, { payload }) {
            let updatedFriendList = state.map((item) => {
                if (item.id === payload) {
                    return { ...item, accepted: true };
                }
                return item;
            });
            return updatedFriendList;
        },
    },
});

export const { received, decline, accept } = friendslice.actions;
export default friendslice.reducer;

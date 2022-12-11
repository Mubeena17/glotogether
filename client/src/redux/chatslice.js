import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
    },
    reducers: {
        getMessage: (state, { payload }) => {
            console.log("get message action");
            state.messages.push(...payload.reverse());
        },
        newMessage: (state, { payload }) => {
            console.log("new message ", payload);
            state.messages.push(payload);
        },
    },
});
export const { getMessage, newMessage } = chatSlice.actions;
export default chatSlice.reducer;

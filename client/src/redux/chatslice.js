import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
    },
    reducers: {
        getMessage: (state, action) => {
            console.log("get message action");
            state.messages.push(...action.payload);
        },
        newMessage: (state, action) => {
            console.log("get message action");
            state.messages.push(action.payload);
        },
    },
});
export const { getMessage, newMessage } = chatSlice.actions;
export default chatSlice.reducer;

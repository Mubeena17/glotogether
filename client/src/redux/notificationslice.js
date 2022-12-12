import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name: "toast",
    initialState: {
        show: false,
        data: "",
    },
    reducers: {
        showToast: (state, action) => {
            state.data = action.payload;
            state.show = true;
        },
        hideToast: (state, action) => {
            state.data = "";
            state.show = false;
        },
    },
});

export const { showToast, hideToast } = notificationSlice.actions;
export default notificationSlice.reducer;

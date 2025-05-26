import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addMyRequests: (state, action) => {
            return action.payload
        }
    }
});

export const { addMyRequests } = requestSlice.actions;
export default requestSlice.reducer;

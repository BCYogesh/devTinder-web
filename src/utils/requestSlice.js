import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addMyRequests: (state, action) => {
            return action.payload;
        },
        removeRequests: (state, action) => {
            const newArray = state.filter((req) => req._id != action.payload);
            return newArray;
        }
    }
});

export const { addMyRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;

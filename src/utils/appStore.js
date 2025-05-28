import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestSlice from "./requestSlice";
import connectionSlice from "./connectionSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        request: requestSlice,
        connections: connectionSlice
    }
});

export default appStore;
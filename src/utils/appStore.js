import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestSlice from "./requestSlice";


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        request: requestSlice
    }
});

export default appStore;
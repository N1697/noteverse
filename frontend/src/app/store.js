import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import noteReducer from "../features/note/noteSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});

export default store;

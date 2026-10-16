import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskMembersSlice  from "./slices/taskMembersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasksmembers:taskMembersSlice,
  },
});

// types for custom hook and interceptor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

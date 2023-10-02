import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./features/jobs/jobsSlice";
import adminReducer from "./features/jobs/adminSlice";
import authenticationReducer from "./features/authenticate/authenticationSlice";
import userReducer from "./features/authenticate/userSlice";
import favoriteReducer from "./features/jobs/favoriteJobsSlice";
import forgotPasswordReducer from "./features/authenticate/forgotPasswordSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    admin: adminReducer,
    authentication: authenticationReducer,
    user: userReducer,
    favoriteJobs: favoriteReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export default store.reducer;

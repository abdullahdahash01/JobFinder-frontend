import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  isLoading: true,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
});

export default jobsSlice.reducer;

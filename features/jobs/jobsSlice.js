import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { getAllJobs } from "./../../utils/http";

const allJobsUrl = "http://192.168.56.1:8000/api/v1/jobs";

const initialState = {
  jobs: [],
  isLoading: true,
};

export const fetchJobs = createAsyncThunk("fetch/jobs", async (obj) => {
  const { token, searchValue } = obj;
  // if (!searchValue) searchValue = "";

  return axios
    .get(`${allJobsUrl}?value=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data.jobs)
    .catch((err) => console.log(err));
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchJobs.fulfilled, (state, { payload }) => {
        payload.reverse();
        state.isLoading = false;
        state.jobs = payload;
      }),
      builder.addCase(fetchJobs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { fetchJobs } = jobsSlice.actions;

export default jobsSlice.reducer;

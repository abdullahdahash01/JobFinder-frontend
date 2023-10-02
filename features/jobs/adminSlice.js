import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Alert } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const allJobsUrl = "http://192.168.56.1:8000/api/v1/jobs";

const initialState = {
  title: "",
  description: [],
  youDo: [],
  qualifications: [],
  niceToHave: [],
  city: "",
  salary: "",
  contact: "",
  change: false,
};

export const createJob = createAsyncThunk(
  "create/job",
  async (state, { rejectWithValue }) => {
    console.log(state);

    return axios
      .post(allJobsUrl, state)
      .then((res) => res.data.data.job)
      .catch((err) => console.log(err));
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setTitle: (state, { payload }) => {
      state.title = payload;
    },
    setCity: (state, { payload }) => {
      state.city = payload;
    },
    setSalary: (state, { payload }) => {
      state.salary = payload;
    },
    setContact: (state, { payload }) => {
      state.contact = payload;
      console.log(state);
    },
    setDescription: (state, { payload }) => {
      console.log(payload);
      const { field, value } = payload;

      const item = { id: uuid(), value };
      state[field] = [...state[field], item];
    },
    //delete List item from UI ONLY
    deleteDescription: (state, { payload }) => {
      const { field, id } = payload;

      state[field] = state[field].filter((item) => {
        return item.id !== id;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.change = true;
      console.log("pending");
    }),
      builder.addCase(createJob.fulfilled, (state, { payload }) => {
        console.log("fulfilled");

        //reseting all fields
        return (state = initialState);
      }),
      builder.addCase(createJob.rejected, (state, { payload }) => {
        console.log(payload);
        console.log("rejected");
        Alert.alert("warning", payload);
      });
  },
});

export const {
  setTitle,
  setContact,
  setCity,
  setSalary,
  setDescription,
  deleteDescription,
} = adminSlice.actions;
export default adminSlice.reducer;

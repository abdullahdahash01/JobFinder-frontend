import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { current } from "immer";
import axios from "axios";
import { Alert } from "react-native";

const getMeApi = "http://192.168.56.1:8000/api/v1/users/me";
const updateMeApi = "http://192.168.56.1:8000/api/v1/users/updateMe";

const initialState = { jobs: [] };

export const getMeFav = createAsyncThunk(
  "getMeFav",
  async (token, { rejectWithValue }) => {
    console.log(token);
    return axios
      .get(getMeApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.data;
      })
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const updateUserFav = createAsyncThunk(
  "updateUserFav",
  async (obj, { rejectWithValue }) => {
    const { token, data } = obj;
    // const { favoriteJobs } = data;
    return axios
      .patch(updateMeApi, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        return rejectWithValue(err.response.data.message);
      });
  }
);

const favoriteJobsSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMeFav.pending, (state) => {
      console.log("pending");
    }),
      builder.addCase(getMeFav.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.jobs = payload.user.favoriteJobs;
      }),
      builder.addCase(getMeFav.rejected, (state, { payload }) => {
        console.log("rejected " + payload);
      }),
      builder.addCase(updateUserFav.pending, (state) => {
        console.log("pending");
      }),
      builder.addCase(updateUserFav.fulfilled, (state, { payload }) => {
        console.log(payload);
        // state.jobs = payload.user.favoriteJobs;
        // Alert.alert("تم", "تم تعديل البيانات الشخصية بنجاح");
      }),
      builder.addCase(updateUserFav.rejected, (state, { payload }) => {
        console.log("rejected " + payload);
        Alert.alert("خطأ", payload);
      });
  },
});

export default favoriteJobsSlice.reducer;

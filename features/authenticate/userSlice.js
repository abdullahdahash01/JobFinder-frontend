import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

const getMeApi = "http://192.168.56.1:8000/api/v1/users/me";
const updateMeApi = "http://192.168.56.1:8000/api/v1/users/updateMe";

const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const getMe = createAsyncThunk(
  "getMe",
  async (token, { rejectWithValue }) => {
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

export const updateUser = createAsyncThunk(
  "updateUser",
  async (obj, { rejectWithValue }) => {
    const { token, data } = obj;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setField: (state, { payload }) => {
      const { field, value } = payload;

      state[field] = value;
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      console.log("pending");
    }),
      builder.addCase(getMe.fulfilled, (state, { payload }) => {
        console.log(state);
        console.log(payload);
        state.name = payload.user.name;
        state.lastName = payload.user.lastName;
        state.email = payload.user.email;
      }),
      builder.addCase(getMe.rejected, (state, { payload }) => {
        console.log("rejected");
      }),
      builder.addCase(updateUser.pending, (state) => {
        console.log("pending");
      }),
      builder.addCase(updateUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        Alert.alert("تم", "تم تعديل البيانات الشخصية بنجاح");
      }),
      builder.addCase(updateUser.rejected, (state, { payload }) => {
        console.log("rejected " + payload);
        Alert.alert("خطأ", payload);
      });
  },
});

export const { setField } = userSlice.actions;
export default userSlice.reducer;

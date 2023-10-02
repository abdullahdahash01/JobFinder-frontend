import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

const forgotPasswordUrl =
  "http://192.168.56.1:8000/api/v1/users/forgotPassword";

const resetPasswordUrl = "http://192.168.56.1:8000/api/v1/users/resetPassword";

const initialState = {
  email: "",
  confirmationNumber: "",
  newPassword: "",
  newPasswordConfirmation: "",
};

export const forgotPasswordFun = createAsyncThunk(
  "forgotPassword",
  async ({ email, navigation }, { rejectWithValue }) => {
    return axios
      .post(forgotPasswordUrl, { email })
      .then((res) => {
        console.log(res.data);

        navigation.navigate("confirmation");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (
    { confirmationNumber, newPassword, newPasswordConfirmation, navigation },
    { rejectWithValue }
  ) => {
    return axios
      .patch(resetPasswordUrl, {
        token: confirmationNumber,
        password: newPassword,
        passwordConfirm: newPasswordConfirmation,
      })
      .then((res) => {
        navigation.navigate("login");
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setField: (state, { payload }) => {
      const { field, value } = payload;
      if (field === "email") {
        state[field] = value.toLowerCase();
      } else {
        state[field] = value;
      }

      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPasswordFun.pending, (state, { payload }) => {
      console.log(payload);
    }),
      builder.addCase(forgotPasswordFun.fulfilled, (state, { payload }) => {
        console.log(payload);
        Alert.alert("تم", payload.message);
      }),
      builder.addCase(forgotPasswordFun.rejected, (state, { payload }) => {
        console.log(payload);
        Alert.alert("تحذير", payload);
      });
    builder.addCase(resetPassword.pending, (state, { payload }) => {
      console.log(payload);
    }),
      builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.alerts.success = payload.message;

        //Old error handling
        // Alert.alert("تم", payload.message);
      }),
      builder.addCase(resetPassword.rejected, (state, { payload }) => {
        console.log(payload);
        Alert.alert("تحذير", payload);
      });
  },
});

export const { setField } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;

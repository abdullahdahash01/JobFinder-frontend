import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

const loginApi = "http://192.168.56.1:8000/api/v1/users/login";
const signupApi = "http://192.168.56.1:8000/api/v1/users/signup";

const initialState = {
  isAuthenticated: false,
  isUser: true,
  favoriteJobs: [],
  login: {
    email: "",
    name: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    token: "",
    role: "",
    subscribed: false,
    user: {},
    disableBtn: false,
    isLoggingIn: false,
  },
  loginErrors: {
    emailError: "",
    generalError: "",
  },
};

export const loginFunction = createAsyncThunk(
  "login",
  async (state, { rejectWithValue }) => {
    const newState = { ...state, email: state.email.toLowerCase() };
    return axios
      .post(loginApi, newState)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const signupFunction = createAsyncThunk(
  "signup",
  async (data, { rejectWithValue }) => {
    const { state, navigation } = data;
    const newState = { ...state, email: state.email.toLowerCase() };
    return axios
      .post(signupApi, newState)
      .then((res) => {
        navigation.navigate("login");
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return rejectWithValue(err.response.data.message);
      });
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setEmail: ({ login }, { payload }) => {
      // console.log(payload.toLowerCase());
      // const val = payload.toLowerCase();
      login.email = payload;
    },
    setName: ({ login }, { payload }) => {
      login.name = payload;
    },
    setLastName: ({ login }, { payload }) => {
      login.lastName = payload;
    },
    setPassword: ({ login }, { payload }) => {
      login.password = payload;
    },
    setPasswordConfirm: ({ login }, { payload }) => {
      login.passwordConfirm = payload;
    },
    setIsUser: (state) => {
      state.isUser = !state.isUser;
    },
    addFavJob: (state, { payload }) => {
      // console.log(state.favoriteJobs);
      state.favoriteJobs.push(payload);
      state.favoriteJobs.reverse();
      // state.favoriteJobs = newState.reverse();
      // console.log("this is the one" + typeof state.favoriteJobs);
    },
    removeFavJob: (state, { payload }) => {
      state.favoriteJobs = state.favoriteJobs.filter(
        (item) => item !== payload
      );
      console.log(state.favoriteJobs);
    },
    resetError: (state) => {
      state.loginErrors.emailError = "";
      state.loginErrors.generalError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginFunction.pending, (state) => {
      state.login.isLoggingIn = true;
      state.login.disableBtn = true;
    }),
      builder.addCase(loginFunction.fulfilled, (state, { payload }) => {
        state.login.isLoggingIn = false;
        state.login.token = payload.token;
        state.login.token = payload.token;
        state.login.name = payload.data.user.name;
        state.login.lastName = payload.data.user.lastName;
        state.login.role = payload.data.user.role;
        state.favoriteJobs = payload.data.user.favoriteJobs;
        state.login.user = payload.data.user;

        state.isAuthenticated = true;
        state.login.disableBtn = false;

        // console.log(state.login.favoriteJobs);
      }),
      builder.addCase(loginFunction.rejected, (state, { payload }) => {
        state.login.isLoggingIn = false;
        state.login.disableBtn = false;

        //login errors here
        state.loginErrors.emailError = payload;

        //Old errors handling
        // Alert.alert("تحذير", payload);
      });
    builder.addCase(signupFunction.pending, (state) => {
      state.login.disableBtn = true;
      state.isUser = true;

      console.log("pending");
    }),
      builder.addCase(signupFunction.fulfilled, (state, { payload }) => {
        if (payload.status === "pending") {
          Alert.alert("تم", payload.message);
        } else {
          state.login.token = payload.token;
          state.isAuthenticated = true;
        }
        state.login.disableBtn = false;
      }),
      builder.addCase(signupFunction.rejected, (state, { payload }) => {
        state.login.isLoggingIn = false;
        state.login.disableBtn = false;

        Alert.alert("تحذير", payload);
      });
  },
});

export const {
  setEmail,
  setName,
  setLastName,
  setPassword,
  setPasswordConfirm,
  setIsUser,
  addFavJob,
  removeFavJob,
  resetError,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;

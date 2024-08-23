import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signInStart: (state) => {
      state.loading = ture;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      //  这时候 action.payload 就是此时 发送ajax 请求之后，服务器返回的结果。浏览器上可以看到。登录成功返回的就是用户信息。
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.error = action.payload;
      // 登录不成功返回的就是错误信息。
      state.loading = false;
    },

    updataUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = false;
    },
    SignoutUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    SignOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updataUserStart,
  updateUserSuccess,
  updateInFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signoutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addMatcher(
        isAnyOf(register.pending, logIn.pending, logOut.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          logOut.rejected,
          refreshUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          //Коли токен expired
          state.isLoggedIn = false;
          state.token = null;
        }
      );
  },
});

export default slice.reducer;

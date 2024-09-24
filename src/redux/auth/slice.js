import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
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
      .addMatcher(isAnyOf(register.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(register.rejected), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;

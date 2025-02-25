import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

//Встановлення хедера аутентифікації з токеном, що прийде з бека
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

//Видалення хедера після логаута
const setClearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      //   console.log(error); Обʼєкт помилки axios
      const { status, data } = error.response;

      // Обробка дубліката email (MongoDB помилка 11000)
      if (status === 400 && data.code === 11000 && data.keyPattern.email) {
        return thunkAPI.rejectWithValue("This email is already in use.");
      }

      // Інші помилки з сервера
      return thunkAPI.rejectWithValue(data.message || "Registration failed.");
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error.status === 400) {
        return thunkAPI.rejectWithValue("Incorrect email or password.");
      }

      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setClearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    setAuthHeader(state.auth.token);

    try {
      const { data } = await axios.get("/users/current");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      // console.log(state);

      return state.auth.token !== null;
    },
  }
);

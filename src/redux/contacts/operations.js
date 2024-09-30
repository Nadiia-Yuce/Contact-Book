import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//TODO Як створити axios інстанс для зручної роботи з декількома беками
// const axiosInstance = axios.create({
//   baseURL: "https://connections-api.goit.global/",
// });

//Оголошенння операцій для роботи з бекендом
export const fetchContacts = createAsyncThunk(
  "contacts/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      //Повертає видалений обʼєкт, з якого ми для редюсера беремо значення id
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ id, ...updatedContact }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, updatedContact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

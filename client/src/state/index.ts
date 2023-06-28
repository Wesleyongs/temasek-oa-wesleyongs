import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  providers: [],
  providersData: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setProviders: (state, action) => {
      state.providers = action.payload.providers;
    },
    setProvidersData: (state, action) => {
      state.providersData = action.payload.providersData;
    },
  },
});

export const { setMode, setProviders, setProvidersData } = authSlice.actions;
export default authSlice.reducer;

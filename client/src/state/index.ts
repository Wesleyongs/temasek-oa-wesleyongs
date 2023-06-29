import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  providers: [],
  providersData: {},
  selectedProvider: "",
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
    addProvidersData: (state, action) => {
      const { key, value } = action.payload;
      state.providersData = {
        ...state.providersData,
        [key]: value,
      };
    },
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
  },
});

export const { setMode, setProviders, addProvidersData, setSelectedProvider } =
  authSlice.actions;
export default authSlice.reducer;

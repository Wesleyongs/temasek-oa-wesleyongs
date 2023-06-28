import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  providers: [],
  providersInfo: {},
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
    addProvidersInfo: (state, action) => {
      const { key, value } = action.payload;
      state.providersInfo = {
        ...state.providersInfo,
        [key]: value,
      };
    },
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
  },
});

export const { setMode, setProviders, addProvidersInfo, setSelectedProvider } =
  authSlice.actions;
export default authSlice.reducer;

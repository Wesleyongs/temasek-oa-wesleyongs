import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  providers: [],
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
  },
});

export const { setMode, setProviders } = authSlice.actions;
export default authSlice.reducer;

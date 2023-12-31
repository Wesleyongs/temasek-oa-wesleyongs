import { createSlice } from "@reduxjs/toolkit";
import { ProviderData } from "../shared/types";

export interface ReduxState {
  isSidebarOpen: boolean;
  providers: string[];
  providersData: Record<string, ProviderData>;
  selectedProvider: string;
}

const initialState: ReduxState = {
  isSidebarOpen: false,
  providers: [],
  providersData: {},
  selectedProvider: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
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

export const {
  toggleSideBar,
  setProviders,
  addProvidersData,
  setSelectedProvider,
} = authSlice.actions;

export default authSlice.reducer;

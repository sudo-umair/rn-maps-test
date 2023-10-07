import { createSlice } from '@reduxjs/toolkit';
import { IAppState } from '@/interfaces/redux';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IAppState = {
  isLoggedIn: false,
};

export const appStateSlice = createSlice({
  name: 'app-state',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = appStateSlice.actions;

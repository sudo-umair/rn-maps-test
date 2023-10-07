import { createSlice } from '@reduxjs/toolkit';
import { ISavedRegionState } from '@/interfaces/redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISavedRegion } from '@/interfaces/common';

const initialState: ISavedRegionState = {
  savedRegions: [],
};

export const savedRegionSlice = createSlice({
  name: 'savedRegions',
  initialState,
  reducers: {
    addRegion: (state, action: PayloadAction<ISavedRegion>) => {
      state.savedRegions.push(action.payload);
    },
    removeRegion: (state, action: PayloadAction<string>) => {
      state.savedRegions = state.savedRegions.filter(
        (region) => region.id !== action.payload
      );
    },
  },
});

export const { addRegion, removeRegion } = savedRegionSlice.actions;

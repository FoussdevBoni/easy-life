// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ratedsData: [],
  lastFetchTime: 0,
};

export const ratedsSlice = createSlice({
  name: 'rated',
  initialState,
  reducers: {
    setRateds(state, action) {
      state.ratedsData = action.payload;
      state.lastFetchTime = Date.now();
    },
    deleteRateds(state){
     state.ratedsData = [];
    }

  },
});

export const { setRateds , deleteRateds } = ratedsSlice.actions;
export default ratedsSlice.reducer;

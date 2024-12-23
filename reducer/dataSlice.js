// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  lastFetchTime: 0,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      state.lastFetchTime = Date.now();
    },
    deleteData(state){
     state.data = null;
    }

  },
});

export const { setData , deleteData } = dataSlice.actions;
export default dataSlice.reducer;

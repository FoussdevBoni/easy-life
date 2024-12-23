import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingData: true, // État indiquant si la loadingigation est en cours
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loadingData = action.payload;  
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

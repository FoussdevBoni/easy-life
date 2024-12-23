import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: {},
    },
    reducers: {
        login: (state, action) => {
            state.data = action.payload;
        },
        isConnected : (state, action) =>{
            state.conected=true
        },
        logout: (state, action) => {
            state.data = null;
            state.conected = false;
        }
    }
})

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
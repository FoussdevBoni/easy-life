import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        conected: false,
        userId: '',
        profileType: '',
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        isConnected : (state, action) =>{
            state.conected=true
        },
        logout: (state, action) => {
            state.user = null;
            state.conected = false;
        }
    }
})

export const { login, logout, isConected } = UserSlice.actions;

export default UserSlice.reducer;
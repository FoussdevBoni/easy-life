import { createSlice } from "@reduxjs/toolkit";

export const SideBarSlice = createSlice({
    name:'sidebard',
    initialState:{
        isDrawerScreen:true,
        initialScreen:{
            route:'',
            component: null
        }
    },

    reducers:{
        setSidbard: (state,action)=>{
            state.isDrawerScreen = action.payload;
        },
        setInitialScreen: (state,action)=>{
            state.initialScreen.route = action.payload
        }
    }

})

export const { setSidbard, setInitialScreen } = SideBarSlice.actions

export default SideBarSlice.reducer
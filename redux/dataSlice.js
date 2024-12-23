import { createSlice } from "@reduxjs/toolkit";


export const ChildSlice = createSlice({
    name:'Child',
    initialState:{
        childs:[]
    },

    reducers:{
        addChild: (state, action) => {
            state.childs.push(action.payload)
        },
        deleteChild: (state, action) => {
            state.childs = state.childs.pop()
        }
        
    }
})

export const { addChild, deleteChild } = ChildSlice.actions

export default ChildSlice.reducer
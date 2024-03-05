import { createSlice } from "@reduxjs/toolkit";


export const userSlice= createSlice({
    name: 'auth',
    initialState:{
        adminToken: null
    },
    reducers:{
        setToken: (state, action)=>{
            state.adminToken= action.payload;
            window.localStorage.setItem("tokenStorage", action.payload)
        }
    }
})

export const {setToken}= userSlice.actions
export default userSlice.reducer
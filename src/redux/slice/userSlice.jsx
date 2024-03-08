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
        },
        removeToken: (state)=>{
            state.adminToken= null;
            window.localStorage.removeItem("tokenStorage")
        }
    }
})

export const {setToken, removeToken}= userSlice.actions
export default userSlice.reducer